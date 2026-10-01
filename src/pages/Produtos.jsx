import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Produtos.css'
import { supabase } from '../supabase'
import Navbar from '../navbar'
import Rodape from '../rodape'

const initialProducts = [
  { id: 1, name: 'O Mistério das Galáxias', category: 'Livros', price: 49.9, rating: 4.8, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600', description: 'Uma jornada ilustrada pelos segredos mais profundos do universo.' },
  { id: 2, name: 'Retro Synthwave 80s', category: 'CDs', price: 35, rating: 4.9, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600', description: 'Álbum remasterizado com acabamento holográfico e encarte exclusivo.' },
  { id: 3, name: 'Dragão Lendário #001', category: 'Cartinhas', price: 189.9, rating: 5, image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600', description: 'Carta colecionável holográfica com selo de autenticidade.' },
  { id: 4, name: 'Passe V.I.P. Anual', category: 'Planos', price: 199, rating: 4.7, image: 'https://images.unsplash.com/photo-1556742049-0a6723d473cf?auto=format&fit=crop&q=80&w=600', description: 'Frete grátis, lançamentos antecipados e cashback exclusivo.' },
  { id: 5, name: 'Algoritmos Avançados', category: 'Livros', price: 89.9, rating: 4.9, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600', description: 'Guia prático de engenharia de software e estruturas de dados.' },
  { id: 6, name: 'Coleção Mitológica', category: 'Cartinhas', price: 120, rating: 4.8, image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=600', description: 'Box com cartas aleatórias, ultrarraras e deck box exclusivo.' },
]
const banners = [
  { title: 'Colecionáveis que contam histórias', text: 'Encontre livros, CDs e cartinhas para ampliar sua coleção.', image: initialProducts[0].image },
  { title: 'Peças raras, momentos únicos', text: 'Descubra novidades selecionadas para quem gosta de guardar memórias.', image: initialProducts[2].image },
  { title: 'Seu próximo achado está aqui', text: 'Explore o catálogo e monte seu carrinho em poucos cliques.', image: initialProducts[1].image },
]
const money = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const formatProductValue = (product) => product.price == null ? `${product.xp ?? 0} XP` : money(product.price)
const loadSavedCart = () => {
  try {
    const savedCart = JSON.parse(localStorage.getItem('carrinhoProdutos') || '[]')
    return Array.isArray(savedCart) ? savedCart : []
  } catch (error) {
    console.error('Não foi possível recuperar o carrinho salvo.', error)
    return []
  }
}

function Produtos() {
  const navigate = useNavigate()
  const location = useLocation()
  const [category, setCategory] = useState('Todos')
  const [query, setQuery] = useState('')
  const [slide, setSlide] = useState(0)
  const [products, setProducts] = useState(initialProducts)
  const [categories, setCategories] = useState(() => [...new Set(initialProducts.map((product) => product.category))])
  const [cart, setCart] = useState(loadSavedCart)
  const [selected, setSelected] = useState(null)
  const [cartOpen, setCartOpen] = useState(() => new URLSearchParams(location.search).get('carrinho') === 'aberto')
  const [contact, setContact] = useState(null)
  const [contactLoading, setContactLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    const timer = setInterval(() => setSlide((current) => (current + 1) % banners.length), 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    localStorage.setItem('carrinhoProdutos', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    let isCurrent = true

    if (!supabase) {
      setFetchError('Configure as variáveis do Supabase no arquivo .env.')
      setLoading(false)
      return () => { isCurrent = false }
    }

    const loadCategories = async (fallback = []) => {
      const { data, error } = await supabase
        .from('categorias')
        .select('nome')
        .order('nome')

      if (!isCurrent) return

      if (error) {
        setCategories(fallback)
        return
      }

      const names = [...new Set((data ?? []).map((item) => item.nome).filter(Boolean))]
      setCategories(names)
      setCategory((current) => names.includes(current) ? current : 'Todos')
    }

    const loadProducts = async () => {
      const { data, error } = await supabase
        .from('produtos')
        .select('*, categorias(nome)')
        .eq('ativo', true)
        .order('created_at', { ascending: false })

      if (!isCurrent) return

      if (error) {
        setFetchError(`Não foi possível carregar os produtos: ${error.message}`)
        setLoading(false)
        return
      }

      const loadedProducts = data.map((product, index) => ({
        id: product.id,
        sellerId: product.id_usuario,
        name: product.nome,
        category: product.categorias?.nome ?? 'Outros',
        price: product.preco == null ? null : Number(product.preco),
        xp: product.xp,
        quantity: product.quantidade,
        rating: product.avaliacao == null ? null : Number(product.avaliacao),
        image: product.imagem || initialProducts[index % initialProducts.length].image,
        description: product.descricao,
      }))

      setProducts(loadedProducts)
      await loadCategories([...new Set(loadedProducts.map((product) => product.category))])
      setFetchError('')
      setLoading(false)
    }

    loadProducts()

    const categoryChannel = supabase
      .channel('catalogo-categorias')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categorias' }, () => loadCategories())
      .subscribe()

    return () => {
      isCurrent = false
      supabase.removeChannel(categoryChannel)
    }
  }, [])

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'Todos' || product.category === category
    return matchesCategory && `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase())
  }), [category, products, query])
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)

  const notify = (text) => {
    setMessage(text)
    window.setTimeout(() => setMessage(''), 2500)
  }
  const addToCart = (product) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id)
      return found ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
    notify(`${product.name} foi adicionado ao carrinho.`)
  }
  const changeQuantity = (id, amount) => setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0))
  const handleContact = async (product) => {
    if (!localStorage.getItem('usuarioId') && !sessionStorage.getItem('usuarioId')) {
      setContact({ product, needsLogin: true })
      return
    }

    if (!supabase) {
      setContact({ product, error: 'Não foi possível buscar os dados do vendedor: Supabase não configurado.' })
      return
    }

    if (!product.sellerId) {
      setContact({ product, error: 'Este produto não possui um vendedor associado.' })
      return
    }

    setContact({ product, loading: true })
    setContactLoading(true)
    try {
      const { data: seller, error } = await supabase
        .from('usuarios')
        .select('nome, email, telefone')
        .eq('id', product.sellerId)
        .maybeSingle()

      if (error) {
        setContact({ product, error: `Não foi possível carregar os dados do vendedor: ${error.message}` })
        return
      }

      if (!seller) {
        setContact({ product, error: 'Não foi possível encontrar os dados do vendedor.' })
        return
      }

      setContact({ product, seller })
    } catch (error) {
      setContact({ product, error: `Não foi possível carregar os dados do vendedor: ${error.message}` })
    } finally {
      setContactLoading(false)
    }
  }
  const handleNavigate = (path) => navigate(`/${path}`)

  return (
    <div className="app">
      <Navbar onNavigate={handleNavigate} />
      <nav className="categories" aria-label="Categorias">{['Todos', ...categories].map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</nav>
      <main id="inicio">
        <section className="hero">
          <div className="hero-copy"><span className="eyebrow">CATÁLOGO OFICIAL</span><h1>{banners[slide].title}</h1><p>{banners[slide].text}</p><a className="primary" href="#catalogo">Explorar coleção</a></div>
          <img src={banners[slide].image} alt="Item em destaque" />
          <div className="hero-controls"><button onClick={() => setSlide((slide - 1 + banners.length) % banners.length)} aria-label="Anterior">←</button>{banners.map((banner, index) => <button key={banner.title} className={index === slide ? 'selected' : ''} onClick={() => setSlide(index)} aria-label={`Slide ${index + 1}`} />)}<button onClick={() => setSlide((slide + 1) % banners.length)} aria-label="Próximo">→</button></div>
        </section>
        <section id="catalogo" className="catalog">
          <div className="section-heading"><div><span className="eyebrow">SELEÇÃO DA SEMANA</span><h2>Encontre algo para guardar</h2></div><div className="catalog-actions"><span>{filteredProducts.length} itens</span><button type="button" className="open-cart" onClick={() => setCartOpen(true)}>Carrinho ({itemCount})</button></div></div>
          {loading && <p className="catalog-message" role="status">Carregando produtos...</p>}
          {fetchError && <p className="catalog-message" role="alert">{fetchError} Exibindo os itens de demonstração.</p>}
          {filteredProducts.length === 0 ? <div className="empty">Nenhum item encontrado. Tente outra busca.</div> : <div className="product-grid">{filteredProducts.map((product) => <article className="product" key={product.id}><img src={product.image} alt={product.name} /><div className="product-body"><small>{product.category} · {product.rating == null ? `${product.xp ?? 0} XP · ${product.quantity ?? 0} disponíveis` : `★ ${product.rating}`}</small><h3>{product.name}</h3><p>{product.description}</p><div className="product-footer"><strong>{formatProductValue(product)}</strong><button className="details" onClick={() => setSelected(product)}>Detalhes</button><button onClick={() => addToCart(product)}>Adicionar</button></div></div></article>)}</div>}
        </section>
      </main>
      {message && <div className="toast">✓ {message}</div>}
      {selected && <div className="overlay" onClick={() => setSelected(null)}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="close" onClick={() => setSelected(null)}>×</button><img src={selected.image} alt={selected.name} /><div><span className="eyebrow">{selected.category}</span><h2>{selected.name}</h2><p>{selected.description}</p><strong>{formatProductValue(selected)}</strong><button className="primary" onClick={() => { addToCart(selected); setSelected(null) }}>Adicionar ao carrinho</button></div></div></div>}
      {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)}><aside className="drawer" aria-label="Carrinho" onClick={(event) => event.stopPropagation()}><div className="drawer-heading"><h2>Seu carrinho ({itemCount})</h2><button className="close" aria-label="Fechar carrinho" onClick={() => setCartOpen(false)}>×</button></div>{cart.length === 0 ? <div className="empty">Seu carrinho está vazio.</div> : <>{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name} /><div className="cart-item-info"><strong>{item.name}</strong><small>{formatProductValue(item)}</small><div className="cart-quantity"><button aria-label={`Remover uma unidade de ${item.name}`} onClick={() => changeQuantity(item.id, -1)}>-</button><span>{item.quantity}</span><button aria-label={`Adicionar uma unidade de ${item.name}`} onClick={() => changeQuantity(item.id, 1)}>+</button></div><button className="contact-button" onClick={() => handleContact(item)}>Contatar</button></div></div>)}<p className="cart-note">A negociação é feita diretamente com o vendedor. O site não realiza compras nem pagamentos.</p></>}</aside></div>}
      {contact && <div className="overlay contact-overlay" onClick={() => { if (!contactLoading) setContact(null) }}><section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title" onClick={(event) => event.stopPropagation()}><button className="close" aria-label="Fechar contato" disabled={contactLoading} onClick={() => setContact(null)}>×</button><span className="eyebrow">CONTATO DO VENDEDOR</span><h2 id="contact-title">{contact.product.name}</h2>{contact.needsLogin ? <><p>Você não está logado. Faça login para ver as informações do vendedor.</p><button className="primary" onClick={() => navigate('/login', { state: { returnTo: '/?carrinho=aberto' } })}>Fazer login</button></> : contact.error ? <p className="contact-error" role="alert">{contact.error}</p> : contactLoading || contact.loading ? <p role="status">Carregando contato do vendedor...</p> : contact.seller && <div className="seller-info"><p><strong>Nome:</strong> {contact.seller.nome}</p><p><strong>E-mail:</strong> <a href={`mailto:${contact.seller.email}`}>{contact.seller.email}</a></p><p><strong>Telefone:</strong> <a href={`tel:${contact.seller.telefone}`}>{contact.seller.telefone}</a></p></div>}</section></div>}
      <Rodape onNavigate={handleNavigate} />
    </div>
  )
}

export default Produtos;

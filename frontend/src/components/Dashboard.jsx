import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes, faArrowLeft, faArrowRight, faFileImport } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import Papa from 'papaparse'; // Importando a biblioteca para ler CSV
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCarrinho, setShowCarrinho] = useState(false);
  const [showDescricao, setShowDescricao] = useState(false);
  const [descricaoCompleta, setDescricaoCompleta] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const produtosPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/perfil', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  // Função para importar produtos de um arquivo CSV
  const importarProdutosCSV = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true, // Assume a primeira linha do CSV como cabeçalho
        complete: (result) => {
          const produtosImportados = result.data.map((item) => ({
            id: item.id,
            title: item.title,
            price: parseFloat(item.price),
            description: item.description,
            category: item.category,
            image: item.image || 'https://via.placeholder.com/150', // Imagem padrão caso não haja
          }));
          setProdutos(produtosImportados);
          toast.success('Produtos importados com sucesso!');
        },
        error: (err) => {
          setError('Erro ao importar o arquivo CSV.');
          toast.error('Erro ao importar o arquivo CSV.');
        },
      });
    }
  };

  const importProdutos = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProdutos(data);
      setError(null);

      // Exibe uma notificação de sucesso
      toast.success('Produtos importados com sucesso!', {
        position: "top-right",
        autoClose: 2000, // Fecha após 2 segundos
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
      });
    } catch (err) {
      setError('Erro ao importar produtos!');
      toast.error('Erro ao importar produtos!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const resetProdutos = () => {
    setProdutos([]);
    setCurrentPage(1);
  };

  const adicionarAoCarrinho = (produto) => {
    const novoItem = {
      id: produto.id,
      title: produto.title,
      price: produto.price,
      image: produto.image,
      quantity: 1,
    };
    setCarrinho([...carrinho, novoItem]);

    toast.success('Produto adicionado ao carrinho!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
    });
  };

  const removerDoCarrinho = (index) => {
    const novoCarrinho = carrinho.filter((_, i) => i !== index);
    setCarrinho(novoCarrinho);
  };

  const handleCarrinhoClick = () => {
    setShowCarrinho(!showCarrinho);
  };

  const exportProdutosCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + ["id", "title", "price", "description", "category", "image"].join(",") + "\n"
      + produtos.map(produto => [
        produto.id,
        `"${produto.title}"`, // Título entre aspas para evitar problemas com vírgulas
        produto.price,
        `"${produto.description}"`, // Descrição entre aspas para evitar problemas com vírgulas
        produto.category,
        `"${produto.image}"` // URL da imagem entre aspas para evitar problemas com vírgulas
      ].join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "produtos.csv");
    link.click();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const abrirDescricaoCompleta = (descricao) => {
    setDescricaoCompleta(descricao);
    setShowDescricao(true);
  };

  const indexOfLastProduto = currentPage * produtosPerPage;
  const indexOfFirstProduto = indexOfLastProduto - produtosPerPage;
  const currentProdutos = produtos.slice(indexOfFirstProduto, indexOfLastProduto);

  const nextPage = () => {
    if (currentPage < Math.ceil(produtos.length / produtosPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!userData) return <div>Carregando...</div>;

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={false}
      />

      <header className="dashboard-header">
        <h1>Desafio Processo Seletivo - Rafael Hedlund</h1>
        <div className="dashboard-header-buttons">
          <button className="dashboard-header-button" onClick={handleLogout}>
            Logout
          </button>
          <button className="dashboard-header-button" onClick={handleCarrinhoClick}>
            <FontAwesomeIcon icon={faShoppingCart} /> ({carrinho.length})
          </button>
        </div>
      </header>

      <div className="dashboard-container">
        <div className="dashboard-user-info">
          <h2>Bem-vindo, {userData.nome}</h2>
          <p>Email: {userData.email}</p>

          <div className="dashboard-button-container">
            <button className="dashboard-button" onClick={importProdutos} disabled={loading}>
              {loading ? 'Importando...' : 'Importar Produtos'}
            </button>
            <button className="dashboard-button" onClick={exportProdutosCSV} disabled={produtos.length === 0}>
              Exportar para CSV
            </button>
            {/* Botão para importar produtos de um arquivo CSV */}
            <label className="dashboard-button" style={{ cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faFileImport} /> Importar CSV
              <input
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                onChange={importarProdutosCSV}
              />
            </label>
            <button className="dashboard-button" onClick={resetProdutos}>
              Resetar Produtos
            </button>
          </div>
        </div>

        <div className="dashboard-panel">
          {error && <p className="dashboard-error">{error}</p>}

          <div className="product-list">
            {produtos.length > 0 ? (
              currentProdutos.map(produto => (
                <div key={produto.id} className="dashboard-product-card">
                  {produto.image && <img src={produto.image} alt={produto.title} />}
                  <h3>{produto.title}</h3>
                  <p className="price">R${produto.price}</p>
                  <p>
                    {produto.description.substring(0, 100)}...
                    <button
                      onClick={() => abrirDescricaoCompleta(produto.description)}
                      style={{ color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Ler mais
                    </button>
                  </p>
                  <button onClick={() => adicionarAoCarrinho(produto)}>
                    <FontAwesomeIcon icon={faShoppingCart} /> Adicionar ao Carrinho
                  </button>
                </div>
              ))
            ) : (
              <p className="no-products">Nenhum produto importado.</p>
            )}
          </div>

          {produtos.length > produtosPerPage && (
            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 1}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === Math.ceil(produtos.length / produtosPerPage)}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          )}
        </div>
      </div>

      {showCarrinho && (
        <>
          <div className="modal-overlay" onClick={() => setShowCarrinho(false)} />
          <div className="carrinho-modal">
            <h3>Itens no Carrinho</h3>
            <ul>
              {carrinho.map((item, index) => (
                <div key={index} className="carrinho-item">
                  <img src={item.image} alt={item.title} />
                  <div className="carrinho-item-info">
                    <h4>{item.title}</h4>
                    <p>R${item.price}</p>
                  </div>
                  <button className="remove-button" onClick={() => removerDoCarrinho(index)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              ))}
            </ul>
            <button onClick={() => setShowCarrinho(false)}>Fechar</button>
          </div>
        </>
      )}

      {showDescricao && (
        <>
          <div className="modal-overlay" onClick={() => setShowDescricao(false)} />
          <div className="descricao-modal">
            <h3>Descrição Completa</h3>
            <p>{descricaoCompleta}</p>
            <button onClick={() => setShowDescricao(false)}>Fechar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
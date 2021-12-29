import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';
import DetallesProducto from '../components/layout/DetallesProducto';
import useProductos from '../hooks/useProductos';

const Buscar = () => {
  const router = useRouter();
  const { query: { q }} = router;

  // Todos los productos
  const { productos } = useProductos('creado');
  const [ resultado, guardarResultado ] = useState([]);

  useEffect(() => {
      if(!q){
        return;
      }

      const busqueda = q.toLowerCase();
      const filtro = productos.filter(producto => {
        return (
          producto.nombre.toLowerCase().includes(busqueda) ||
          producto.descripcion.toLowerCase().includes(busqueda)
        )
      })

      console.log(filtro);
      guardarResultado(filtro);

  }, [q, productos])

  return (
    <div>
      <Layout>
      <div className="listado-productos">
          <div className="contenedor">
            <div className="bg-white">
              {resultado.map(producto=> (
                <DetallesProducto
                  key={producto.id}
                  producto={producto}
                />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Buscar;
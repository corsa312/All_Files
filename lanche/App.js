// Importe os componentes e hooks necessários do React e React Native
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Usaremos esta biblioteca para o ícone do carrinho

// Dados do menu da lanchonete
const menuItems = [
  {
    id: '1',
    name: 'Hambúrguer Clássico',
    description: 'Pão de brioche, carne, queijo, alface, tomate e maionese especial.',
    price: 25.00,
    image: 'https://img77.uenicdn.com/image/upload/v1582164126/business/99def3c9-86a1-4c19-9317-d5376c18c298/hamburguer-shutterstockjpg.jpg',
  },
  {
    id: '2',
    name: 'Batata Frita',
    description: 'Batatas crocantes e sequinhas, com sal e alecrim.',
    price: 12.00,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCSFibZy-AX_Mb4CbkCAbQ9Ev2YT_93fCMJA&s',
  },
  {
    id: '3',
    name: 'Milkshake de Chocolate',
    description: 'Sorvete de chocolate cremoso com calda e chantilly.',
    price: 18.00,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSMgES-WoWgUZuCs2-2NStbB94RYbpzCFTwg&s',
  },
  {
    id: '4',
    name: 'Sanduíche Natural',
    description: 'Pão integral, peito de peru, queijo branco, cenoura e requeijão.',
    price: 20.00,
    image: 'https://s2-receitas.glbimg.com/nOQWhyFoJ4dcHkfKHnHClQMEewc=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2022/5/A/XhOhwCQbAwbuL2bq3NIg/sanduiche-natural-de-frango.jpg',
  },
  {
    id: '5',
    name: 'Refrigerante',
    description: 'Lata de refrigerante de 350ml.',
    price: 6.00,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgaNVjErGyWPf7n2E8XbiWu9pQ5nEVSvXFHA&s',
  },
  {
    id: '6',
    name: 'Salada de Frutas',
    description: 'Mix de frutas frescas da estação, com iogurte natural.',
    price: 15.00,
    image: 'https://vocegastro.com.br/app/uploads/2021/09/salada-de-frutas-fit.webp',
  },
];

// Este é o componente principal do aplicativo de lanchonete.
export default function App() {
  const [cart, setCart] = useState({});

  // Adiciona um item ao carrinho ou aumenta a quantidade se já existir.
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      newCart[item.id] = (newCart[item.id] || 0) + 1;
      return newCart;
    });
  };

  // Calcula o valor total do carrinho.
  const calculateTotal = () => {
    return Object.keys(cart).reduce((total, itemId) => {
      const item = menuItems.find((i) => i.id === itemId);
      return total + (item ? item.price * cart[itemId] : 0);
    }, 0);
  };

  // Renderiza cada item da lista do menu.
  const renderItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
        <Text style={styles.addButtonText}>Adicionar</Text>
        <FontAwesome name="plus" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho do aplicativo */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          <FontAwesome name="cutlery" size={24} color="#FFFFFF" />
          Menu da Lanchonete
        </Text>
      </View>

      {/* Lista de itens do menu */}
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Exibição do total do carrinho */}
      <View style={styles.cartTotalContainer}>
        <Text style={styles.cartTotalText}>Total: R$ {calculateTotal().toFixed(2)}</Text>
      </View>
    </View>
  );
}

// Estilos para os componentes, feitos com StyleSheet.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#3B82F6',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 24, // Ajusta para evitar a barra de status do celular
  },
  listContainer: {
    padding: 16,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  itemDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginTop: 8,
  },
  addButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 6,
  },
  cartTotalContainer: {
    backgroundColor: '#3B82F6',
    padding: 16,
    alignItems: 'center',
  },
  cartTotalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

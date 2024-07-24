import React, { createContext, useContext, useReducer, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const productData = [
  {
    id: 1,
    title: 'Paneer',
    description:
      'A vertical shot of traditional Indian paneer butter masala or cheese cottage curry on a black surface',
    price: 49.99,
    rating: 4.5,
    category: 'food',
    image:
      'https://img.freepik.com/free-photo/vertical-shot-traditional-indian-paneer-butter-masala-cheese-cottage-curry-black-surface_181624-32001.jpg?t=st=1721589985~exp=1721593585~hmac=92cbffef69b767ddc437b4151cbeb58024e7f84e963f1cee1414381fc533effa&w=360',
  },
  {
    id: 2,
    title: 'omelet egg',
    description: 'Protein rich, fried eggs omelet on the table',
    price: 129.99,
    rating: 4.8,
    category: 'food',
    image:
      'https://img.freepik.com/free-photo/high-angle-omelette-plate-with-tomatoes-breakfast_23-2148417396.jpg?t=st=1721655860~exp=1721659460~hmac=d6bf9ffd261c38c18b9beb34f700ec4d5b2f16831ec079d6835afe93e8f1cd5c&w=900',
  },
  {
    id: 3,
    title: 'kurkure',
    description:
      'Snacks for evening, corn chips of triangular shape levitate on a white background',
    price: 34.99,
    rating: 4.6,
    category: 'food',
    image:
      'https://img.freepik.com/premium-photo/delicious-homemade-kurkure-snack-white-background_75648-12105.jpg?w=360',
  },
  {
    id: 4,
    title: 'chocolates',
    description: 'Less in calories, no sugar',
    price: 199.99,
    rating: 4.9,
    category: 'food',
    image:
      'https://img.freepik.com/free-vector/chocolate-bars-set_1284-13307.jpg?t=st=1721655948~exp=1721659548~hmac=e237a6e07bb6d68efa4e3aff116104919c97ff28e56aa831276b5fd469f09566&w=740',
  },
];

const FavoritesContext = createContext();

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      return [...state, action.product];
    case 'REMOVE_FROM_FAVORITES':
      return state.filter((product) => product.id !== action.productId);
    default:
      return state;
  }
};

const FavoritesProvider = ({ children }) => {
  const [favorites, dispatch] = useReducer(favoritesReducer, []);

  const addToFavorites = (product) => {
    dispatch({ type: 'ADD_TO_FAVORITES', product });
  };

  const removeFromFavorites = (productId) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', productId });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

const useFavorites = () => useContext(FavoritesContext);

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.product];
    case 'REMOVE_FROM_CART':
      return state.filter((product) => product.id !== action.productId);
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = async () => {
    if (username && password && email) {
      try {
        await AsyncStorage.setItem('user', JSON.stringify({ username, password, email }));
        navigation.navigate('Login');
      } catch (e) {
        Alert.alert('Error saving data');
      }
    } else {
      Alert.alert('Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/originals/b8/57/f6/b857f6eeed86bc1eda743afec402b194.jpg' }}
        resizeMode="contain"
        style={styles.imageBackground}
      >
        <View style={styles.gridContainer1}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.buttonContainer1}>
            <View style={styles.buttonWrapper}>
              <Button title="Sign Up" color="#e28743" onPress={handleSignUp} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      if (user && username === user.username && password === user.password) {
        navigation.navigate('Welcome', { username: user.username });
      } else {
        Alert.alert('Error! Please check your credentials again');
      }
    } catch (e) {
      Alert.alert('Error retrieving data');
    }
  };

  return (
    <ImageBackground
        source={{ uri: 'https://i.pinimg.com/originals/b8/57/f6/b857f6eeed86bc1eda743afec402b194.jpg' }}
        resizeMode="contain"
        style={styles.imageBackground}>
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer1}>
        <Button title="Login" color="#e28743" onPress={handleSignIn} />
      </View>
    </View>
    </ImageBackground>
  );
};

const StartPage = ({ navigation }) => (
  <ImageBackground
    source={{ uri: 'https://wallpapercave.com/wp/wp3104899.jpg' }}
    style={styles.imageBackground}
  >
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME TO FOOD STALL!</Text>
      <Button
        title="Getting Started"
        color="#4CAF50"
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  </ImageBackground>
);

const WelcomePage = ({ navigation }) => (
  <ImageBackground
    source={{ uri: 'https://th.bing.com/th/id/R.b0c3604c780357793242b7086fd4db19?rik=3F%2fEHzkDjxqaeA&riu=http%3a%2f%2fcdn.wallpapersafari.com%2f0%2f57%2fk5F1Ja.jpg&ehk=ftMk9u%2fC%2b%2byes85jeSpeDpHNnhKkcclkoIsDK3EtoEE%3d&risl=&pid=ImgRaw&r=0' }}
    style={styles.imageBackground}
  >
    <View style={styles.container}>
      <Text style={styles.welcomeText}>WELCOME!</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="View Products"
          color="#4CAF50"
          onPress={() => navigation.navigate('ProductsDrawer')}
        />
        <Button
          title="Log Out"
          color="#4CAF50"
          onPress={() => navigation.navigate('Start')}
        />
      </View>
    </View>
  </ImageBackground>
);

const ProductCard = ({ product, isFavorite, onToggleFavorite, onAddToCart }) => (
  <View style={styles.card}>
    <Image source={{ uri: product.image }} style={styles.image} />
    <Text style={styles.cardTitle}>{product.title}</Text>
    <Text style={styles.cardDescription}>{product.description}</Text>
    <Text style={styles.cardPrice}>${product.price.toFixed(2)}</Text>
    <Text style={styles.cardRating}>Rating: {product.rating} ★</Text>
    <TouchableOpacity
      style={styles.favoriteButton}
      onPress={() => onToggleFavorite(product)}
    >
      <Text style={styles.favoriteButtonText}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.addToCartButton}
      onPress={() => onAddToCart(product)}
    >
      <Text style={styles.addToCartButtonText}>Add to Cart</Text>
    </TouchableOpacity>
  </View>
);

const ProductPage = ({ navigation }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  const handleToggleFavorite = (product) => {
    if (favorites.some((fav) => fav.id === product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <ScrollView>
      <ImageBackground source={{ uri: 'https://img.freepik.com/premium-photo/food-cooking-background-stone-texture-with-sea-salt-pepper-garlic-parsley-light-grey-abstract-food-background-empty-space-text-can-be-used-food-posters-design-menu-top-view_253362-16400.jpg?w=2000' }} style={styles.imageBackground}></ImageBackground>
      <View style={styles.container}>
        <Text style={styles.subTitle}>Product List</Text>
        {productData.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.some((fav) => fav.id === product.id)}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={addToCart}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const Favorites = ({ navigation }) => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <ScrollView>
      <ImageBackground source={{ uri: 'https://img.freepik.com/premium-photo/food-cooking-background-stone-texture-with-sea-salt-pepper-garlic-parsley-light-grey-abstract-food-background-empty-space-text-can-be-used-food-posters-design-menu-top-view_253362-16400.jpg?w=2000' }} style={styles.imageBackground}></ImageBackground>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Favorite Products</Text>
        {favorites.map((product) => (
          <View key={product.id} style={styles.card}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.cardTitle}>{product.title}</Text>
            <Text style={styles.cardDescription}>{product.description}</Text>
            <Text style={styles.cardPrice}>${product.price.toFixed(2)}</Text>
            <Text style={styles.cardRating}>Rating: {product.rating} ★</Text>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => removeFromFavorites(product.id)}
            >
              <Text style={styles.favoriteButtonText}>Remove from Favorites</Text>
            </TouchableOpacity>
            
          </View>
        ))}
        <Button
          title="Go Back"
          color="#4CAF50"
          onPress={() => navigation.navigate('Welcome')}
        />
      </View>
    </ScrollView>
  );
};

const Cart = ({ navigation }) => {
  const { cart, removeFromCart } = useCart();

  return (
    <ScrollView>
      <ImageBackground source={{ uri: 'https://img.freepik.com/premium-photo/food-cooking-background-stone-texture-with-sea-salt-pepper-garlic-parsley-light-grey-abstract-food-background-empty-space-text-can-be-used-food-posters-design-menu-top-view_253362-16400.jpg?w=2000' }} style={styles.imageBackground}></ImageBackground>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Cart</Text>
        {cart.map((product) => (
          <View key={product.id} style={styles.card}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.cardTitle}>{product.title}</Text>
            <Text style={styles.cardDescription}>{product.description}</Text>
            <Text style={styles.cardPrice}>${product.price.toFixed(2)}</Text>
            <Text style={styles.cardRating}>Rating: {product.rating} ★</Text>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => removeFromCart(product.id)}
            >
              <Text style={styles.favoriteButtonText}>Remove from Cart</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Button
          title="Go Back"
          color="#4CAF50"
          onPress={() => navigation.navigate('Welcome')}
        />
      </View>
    </ScrollView>
  );
};

const ProductsDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Products" component={ProductPage} />
    <Drawer.Screen name="Favorites" component={Favorites} />
    <Drawer.Screen name="Cart" component={Cart} />
  </Drawer.Navigator>
);

const App = () => (
  <NavigationContainer>
    <FavoritesProvider>
      <CartProvider>
        <Stack.Navigator>
          <Stack.Screen name="Start" component={StartPage} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Welcome" component={WelcomePage} />
          <Stack.Screen name="ProductsDrawer" component={ProductsDrawer} />
        </Stack.Navigator>
      </CartProvider>
    </FavoritesProvider>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#4CAF50',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
    gap:5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'black',
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardRating: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  favoriteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  favoriteButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default App;

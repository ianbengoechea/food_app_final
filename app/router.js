/* eslint-disable react/prop-types */
import React from 'react';
import { Drawer, Router, Scene } from 'react-native-router-flux';

import DrawerImage from './components/DrawerImage';
import Colors from '../src/constants/colors';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SideDrawer from './screens/SideDrawer';
import HomeScreen from './screens/HomeScreen'
import RestaurantInfoScreen from "./screens/RestaurantInfoScreen";
import CartScreen from "./screens/CartScreen";
import PaymentHome from "./screens/Payment/Home";
import PaymentComplete from "./screens/Payment/Success";

const AppRouter = () => (
  <Router>
    <Scene key="root" title="" hideNavBar>

      <Scene
        key="loginScreen"
        component={LoginScreen}
        initial
        hideNavBar
      />
      <Scene
        key="signupScreen"
        component={SignupScreen}
      />
      <Drawer
        key="drawer"
        contentComponent={SideDrawer}
        drawerIcon={<DrawerImage />}
        drawerWidth={300}
      >
        <Scene key="rootScene" >
          <Scene
            key="homeScreen"
            component={HomeScreen}
            title="Food App"
            titleStyle={{
              fontFamily: 'Roboto Slab',
              color: Colors.primaryColor,
            }}
          />
            <Scene
                key="restaurantScreen"
                component={RestaurantInfoScreen}
            />
            <Scene
                key="cartScreen"
                component={CartScreen}
                navigationBarStyle={{
                    backgroundColor: '#fff',
                    elevation: 2,
                    borderBottomWidth: 1,
                    borderBottomColor: '#eee',
                }}
                titleStyle={{
                    fontFamily: 'Roboto Slab',
                    color: Colors.primaryColor,
                }}
                title="Cart"
            />
            <Scene
                hideNavBar
                // drawer={false}
                key="paymentHome"
                component={PaymentHome}
            />
            <Scene
                hideNavBar
                key="paymentSuccess"
                component={PaymentComplete}
            />
        </Scene>
      </Drawer>

    </Scene>
  </Router>
);

export default AppRouter;

import axios from 'axios';

const baseURL = 'https://ihoneyherb.com/app-test/'; 

const api = axios.create({
  baseURL,
  headers: {
        'Accept-Language':  localStorage.getItem("language"), 
    },
});
const homeService = {
    GetHomeData: async (auth_key , user_id) => {
        try {
            const formData = new FormData();
            formData.append('auth_key', auth_key);
            formData.append('user_id', user_id);
            
            const response = await api.post(`/home/home.php`, formData);
            return response.data; 
          } catch (error) {
            throw new Error('Failed to list Products'); 
          }
    },
    GetGroups:async (auth_key , user_id) => {
      try {
          const formData = new FormData();
          formData.append('auth_key', auth_key);
          formData.append('user_id', user_id);
          
          const response = await api.post(`/products/groups.php`, formData);
          return response.data; 
        } catch (error) {
          throw new Error('Failed to list groups'); 
        }
  },
  GetCategories:async (auth_key , user_id) => {
    try {
        const formData = new FormData();
        formData.append('auth_key', auth_key);
        formData.append('user_id', user_id);
        
        const response = await api.post(`/products/categories.php`, formData);
        return response.data; 
      } catch (error) {
        throw new Error('Failed to list categories'); 
      }
}
}

const ProductsService = {
    GetProductsWith: async (auth_key , user_id , item_count , limit , home_types   , search_with = "home_types" , keyword = null  ) => {
        try {
            const formData = new FormData();
            formData.append('auth_key', auth_key);
            formData.append('user_id', user_id);
            formData.append('search_with', search_with);
            if(keyword!=null){

                formData.append('keyword', keyword);
            }
            if(search_with == "home_types"){
                formData.append('home_types', home_types);
            }
            
            formData.append('item_count', item_count);
            formData.append('limit', limit);
            
            const response = await api.post(`products/search_filter.php`, formData);
            return response.data; 
          } catch (error) {
            throw new Error('Failed to list Products'); 
          }
    },
    GetProductsWithCategory :async (auth_key , user_id ,category_id ,item_count , limit)=>{
        try {
            const formData = new FormData();
            formData.append('auth_key', auth_key);
            formData.append('user_id', user_id);
            formData.append('category_id', category_id);
            formData.append('item_count', item_count);
            formData.append('limit', limit);
            
            const response = await api.post(`products/cat_filter.php`, formData);
            return response.data; 
          } catch (error) {
            throw new Error('Failed to list Products'); 
          }
    },

    GetProductsWithGroup :async (auth_key , user_id ,group_id ,item_count , limit)=>{
      try {
          const formData = new FormData();
          formData.append('auth_key', auth_key);
          formData.append('user_id', user_id);
          formData.append('group_id', group_id);
          formData.append('item_count', item_count);
          formData.append('limit', limit);
          
          const response = await api.post(`products/group_filter.php`, formData);
          return response.data; 
        } catch (error) {
          throw new Error('Failed to list Products'); 
        }
  },
    GetOffers:async (auth_key , user_id , item_count , limit)=>{
      try {
        const formData = new FormData();
        formData.append('auth_key', auth_key);
        formData.append('user_id', user_id);        
        formData.append('item_count', item_count);
        formData.append('limit', limit);
        
        const response = await api.post(`/products/offers.php`, formData);
        return response.data; 
      } catch (error) {
        throw new Error('Failed to list Products'); 
      }
    },
    GetProductDetails:async (auth_key , user_id ,product_id)=>{
      try {
        const formData = new FormData();
        formData.append('auth_key', auth_key);
        formData.append('user_id', user_id);        
        formData.append('product_id', product_id);
        
        const response = await api.post(`/products/details.php`, formData);
        return response.data; 
      } catch (error) {
        throw new Error('Failed to get Product'); 
      }
    },
    AddToCart:async (auth_key , user_id ,product_id , quantity)=>{
      try {
        const formData = new FormData();
        formData.append('auth_key', auth_key);
        formData.append('user_id', user_id);        
        formData.append('product_id', product_id);
        formData.append('quantity', quantity);
        
        const response = await api.post(`/cart/add_to_cart.php`, formData);
        return response.data; 
      } catch (error) {
        throw new Error('Failed to add Product'); 
      }
    },
    AddToList: async(auth_key , user_id , list_id , product_id)=>{
      try {
        const formData = new FormData();
        formData.append('auth_key', auth_key);
        formData.append('user_id', user_id);        
        formData.append('product_id', product_id);
        formData.append('list_id', list_id);
        
        const response = await api.post(`products/wishlist/add_to_list.php`, formData);
        return response.data; 
      } catch (error) {
        throw new Error('Failed add to list'); 
      }
    },
    Filter: async(auth_key , user_id , category_id , item_count , limit , rating , price_from , price_to , price_sort)=>{
      try {
        const formData = new FormData();
        formData.append('auth_key', auth_key);
        formData.append('user_id', user_id);        
        formData.append('category_id', category_id);
        formData.append('item_count', item_count);
        formData.append('limit', limit);
        formData.append('rating', rating);
        formData.append('price_from', price_from);
        formData.append('price_to', price_to);
        if(price_sort != null)
          formData.append('price_sort', price_sort);
        else
        formData.append('price_sort', "asc");
        
        const response = await api.post(`/products/filters.php`, formData);
        return response.data; 
      } catch (error) {
        throw new Error('Failed'); 
      }
    },

}


const QuizService = {
    GetQuestions :async (auth_key , user_id ,gender ,age )=>{
        try {
            const formData = new FormData();
            formData.append('auth_key', auth_key);
            formData.append('user_id', user_id);
            formData.append('gender', gender);
            formData.append('age', age);
            
            const response = await api.post(`/wellness_quiz/questions.php`, formData);
            return response.data; 
          } catch (error) {
            throw new Error('Failed to get questions'); 
          }
    },

    GetQuizResult :async (auth_key , user_id ,questions )=>{
      try {
          const formData = new FormData();
          formData.append('auth_key', auth_key);
          formData.append('user_id', user_id);
          formData.append('questions', questions);        
          const response = await api.post(`wellness_quiz/products.php`, formData);
          return response.data; 
        } catch (error) {
          throw new Error('Failed to get questions'); 
        }
  }

    
}


const AuthService = {
    Login: async (email , password , token , platform , device_id) =>{
      try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('token', token);        
        formData.append('platform', platform);        
        formData.append('device_id', device_id);        
        const response = await api.post(`/login.php`, formData);
        return response.data; 
      } catch (error) {
        throw new Error('Failed to login'); 
      }
    },


    OTP: async (email ) =>{
      try {
        const formData = new FormData();
        formData.append('email', email);
                
        const response = await api.post(`/sendcode.php`, formData);
        return response.data; 
      } catch (error) {
        throw new Error('Failed to sendcode'); 
      }
    },
    
    ActiveAcount: async (email , passcode) => {
      try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('passcode', passcode);
                
        const response = await api.post(`/activate.php`, formData);
        return response.data; 
      } catch (error) {
        throw new Error('Failed to Active'); 
      }
    },
    RegisterAccount: async(name,  email, password ,phone , token , device_id , platform ) =>{
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phone);
        formData.append('token', token);
        formData.append('device_id', device_id);
        formData.append('platform', platform);
                
        const response = await api.post(`/register.php`, formData);
        return response.data; 
      } catch (error) {
        throw new Error('Failed to register account'); 
      }
    }
    



}

const ProfileService = {

  GetProfileInfo: async (auth_key, user_id) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      
              
      const response = await api.post(`/profile/profile_info.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to get profile info'); 
    }
  },
  EditProfileInfo: async (auth_key, user_id ,  profile_photo , name , phone)=>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('profile_photo', profile_photo);
      formData.append('name', name);
      formData.append('phone', phone);
      
              
      const response = await api.post(`/profile/edit.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to edit profile info'); 
    }
  },

  ChangePasswrd : async(auth_key , user_id , old_pwd , new_pwd) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('old_pwd', old_pwd);
      formData.append('new_pwd', new_pwd);
      
              
      const response = await api.post(`/profile/changepwd.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to change password'); 
    }
  },

  EditMail: async (auth_key , user_id , new_email)=>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('new_email', new_email);
    
              
      const response = await api.post(`/profile/change_email.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to change email'); 
    }
  } ,
  ActivateNewEmail: async (auth_key , user_id , new_email ,   passcode)=>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('new_email', new_email);
      formData.append('passcode', passcode);
    
              
      const response = await api.post(`/profile/activate_newmail.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to change email'); 
    }
  },

  ListLocations: async (auth_key , user_id) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
    
              
      const response = await api.post(`/profile/addresses/list.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to list locations'); 
    }
  },
  AddLcation:async (auth_key , user_id , name ,phone ,primary,address, latitude=0,longitude=0 , location_name="0" ) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('primary', primary);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('location_name', location_name);
    
              
      const response = await api.post(`/profile/addresses/add.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to add location'); 
    }
  },

  EditLocation: async(auth_key , user_id ,id, name ,phone ,primary,address, latitude=0,longitude=0 , location_name="0" ) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('id', id);
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('primary', primary);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('location_name', location_name);
    
              
      const response = await api.post(`/profile/addresses/edit.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to edit location'); 
    }
  },

  DeleteLocation: async(auth_key , user_id ,id ) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('id', id);
    
              
      const response = await api.post(`/profile/addresses/delete.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to delete location'); 
    }
  },

  StoreInfo: async(auth_key , user_id ) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
       
      const response = await api.post(`/profile/store_info.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to load info'); 
    }
  },


  FAQ:async(auth_key , user_id ) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
       
      const response = await api.post(`/profile/faq.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to load FAQ'); 
    }
  },

  GatWalletBalance:async(auth_key , user_id ) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
       
      const response = await api.post(`/profile/wallet/balance.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to get balance'); 
    }
  },

  WalletExchange:async(auth_key , user_id ) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
       
      const response = await api.post(`/profile/wallet/exchange.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to exchange points'); 
    }
  },
  ListNotifications:async(auth_key , user_id ) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
       
      const response = await api.post(`/notifications_list.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to list notifications'); 
    }
  },

  ListOrders:async(auth_key , user_id ) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
       
      const response = await api.post(`/orders/list.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to list orders'); 
    }
  },
  ReturnReasons:async(auth_key , user_id ) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
       
      const response = await api.post(`/orders/return_reasons.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to list reasons'); 
    }
  },
  ReturnItem:async(auth_key , user_id , order_item_id , reason_id , description ) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('order_item_id', order_item_id);
      formData.append('reason_id', reason_id);
      formData.append('description', description);
       
      const response = await api.post(`/orders/return_item.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed'); 
    }
  },
  RateProduct:async(auth_key , user_id , product_id , title , description , rating ) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('product_id', product_id);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('rating', rating);
       
      const response = await api.post(`/orders/add_review.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed'); 
    }
  },


}


const productService = {
    getAllProducts: async () => {
        try {
        const response = await api.get('/products');
        return response.data;
        } catch (error) {
        throw error;
        }
    },
    getProductById: async (productId) => {
        try {
        const response = await api.get(`/products/${productId}`);
        return response.data;
        } catch (error) {
        throw error;
        }
    },
    GetSecondVariation:async (auth_key, variation_id , main_product_id ,option_value ) =>{
      try {
        const formData = new FormData();
        formData.append('auth_key', auth_key);
        formData.append('variation_id', variation_id);
        formData.append('main_product_id', main_product_id);
        formData.append('option_value', option_value);
         
                
        const response = await api.post(`/products/second_variation.php`, formData);
        return response.data; 
      } catch (error) {
        throw new Error('Failed to get second variation'); 
      }
    },
    ListMyLists:async (auth_key, user_id ) =>{
      try {
        const formData = new FormData();
        formData.append('auth_key', auth_key);
        formData.append('user_id', user_id);

         
                
        const response = await api.post(`products/wishlist/list_without_fav.php`, formData);
        return response.data; 
      } catch (error) {
        throw new Error('Failed to get lists'); 
      }
    },

    AddToLists:async (auth_key, user_id , list_id , product_id ) =>{
      try {
        const formData = new FormData();
        formData.append('auth_key', auth_key);
        formData.append('user_id', user_id);
        formData.append('list_id', list_id);
        formData.append('product_id', product_id);

         
                
        const response = await api.post(`products/wishlist/add_to_list.php`, formData);
        return response.data; 
      } catch (error) {
        throw new Error('Failed to add to list'); 
      }
    },

};


const CartService = {
  CartDetails: async (auth_key, user_id) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      
              
      const response = await api.post(`/cart/cart_list.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to get cart info'); 
    }
  },


  ManageQuantity: async (auth_key, user_id , cart_item_id , quantity) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('cart_item_id', cart_item_id);
      formData.append('quantity', quantity);
      
              
      const response = await api.post(`/cart/manage_cart.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to change quantity'); 
    }
  },

  AddCoupon: async (auth_key, user_id , coupon) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('coupon', coupon);

      
              
      const response = await api.post(`/cart/add_coupon.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to add cuopon'); 
    }

    
  },

  RemoveCoupon: async (auth_key, user_id , coupon) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('coupon', coupon);

      
              
      const response = await api.post(`/cart/remove_coupon.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to remove cuopon'); 
    }

    
  },



  Payment: async (auth_key, user_id , coupon) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('coupon', coupon);

      
              
      const response = await api.post(`/cart/remove_coupon.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to remove cuopon'); 
    }

    
  },

  PayNow: async (auth_key, user_id , address_id , wallet , payment_method) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('address_id', address_id);
      formData.append('wallet', wallet);
      formData.append('payment_method', payment_method);
      
      
              
      const response = await api.post(`/cart/pay_now.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to pay'); 
    }

    
  },
 GetSecondVariation:async (auth_key, variation_id , main_product_id ,option_value ) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('variation_id', variation_id);
      formData.append('main_product_id', main_product_id);
      formData.append('option_value', option_value);
       
              
      const response = await api.post(`/products/second_variation.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to get second variation'); 
    }
  },


}

const ListService = {
  GetLists:async (auth_key, user_id) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      
              
      const response = await api.post(`/products/wishlist/list_with_products.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to get lists'); 
    }
  },

  CreateList:async (auth_key, user_id , list_name , fav) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('list_name', list_name);
      formData.append('fav', fav);
      
              
      const response = await api.post(`/products/wishlist/create_list.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to add lists'); 
    }
  },

  RemoveList :async (auth_key, user_id , list_id , fav = 1 ) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('list_id', list_id);
      formData.append('fav', fav);
      
              
      const response = await api.post(`/products/wishlist/delete.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to delete lists'); 
    }
  },
  RemoveProductInList :async (auth_key, user_id , list_id ,product_id ) =>{
    try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('list_id', list_id);
      formData.append('product_id', product_id);
      
              
      const response = await api.post(`/products/wishlist/remove_product.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to remove product'); 
    }
  },
 


}

const ForgetPasswordServices ={
  SendCode:async (email) =>{
    try {
      const formData = new FormData();
      formData.append('email', email);
      
      
              
      const response = await api.post(`/sendcode.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed to send otp'); 
    }
  },
  CheckCode:async (email , passcode) =>{
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('passcode', passcode);
      
      
              
      const response = await api.post(`/checkcode.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed'); 
    }
  },
  ChangePasswrdServ:async (email , new_password) =>{
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('new_password', new_password);
      
      
              
      const response = await api.post(`/changepwd.php`, formData);
      return response.data; 
    } catch (error) {
      throw new Error('Failed'); 
    }
  },
}


export { 
  productService , 
  homeService ,
  ProductsService ,
  QuizService , AuthService ,
  ProfileService  , 
  CartService ,
  ListService ,
  ForgetPasswordServices
};

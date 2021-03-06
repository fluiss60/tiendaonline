import React, { Component } from 'react'
import img1 from '../images/img1.png'
import img2 from '../images/img2.jpg'
import img3 from '../images/img3.jpg'
import img4 from '../images/img4.jpg'
import img5 from '../images/img5.jpg'
import img6 from '../images/img6.jpg'


    
export const DataContext = React.createContext();

export class DataProvider extends Component{
    
    state = {
        products: [
            {
                "_id": "1",
                "title": "canguro negro",
                "src": img1,
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 23,
                "colors":["red","black","crimson","teal"],
                "count": 1
            },
            {
                "_id": "2",
                "title": "Nike shoes 02",
                "src": img2,
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 9,
                "colors":["red","crimson","teal"],
                "count": 1
            },
            {
                "_id": "3",
                "title": "Nike shoes 03",
                "src": img3,
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 11,
                "colors":["teal","white","crimson","teal"],
                "count": 1
            },
            {
                "_id": "4",
                "title": "Nike shoes 04",
                "src": img4,
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 3,
                "colors":["white","black","crimson","teal"],
                "count": 1
            },
            {
                "_id": "5",
                "title": "Nike shoes 05",
                "src": img5,
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 12,
                "colors":["lightblue","green","crimson","teal"],
                "count": 1
            },
            {
                "_id": "6",
                "title": "Nike shoes 06",
                "src": img6,
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 11,
                "colors":["orange","yellow","crimson","teal"],
                "count": 1
            }
        ],
        cart:[],
        total: 0

    
    };

    addCart = (id) =>{
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item._id !== id
        })
        if (check) {
            const data = products.filter(product =>{
                return product._id === id
            })
            this.setState({cart: [...cart,...data]})            
        }else{
            alert("El producto ha sido agregado al carrito")
        }
        
    };
    
    reduction = id =>{
        const { cart } = this.state
        cart.forEach(item =>{
            if (item._id === id) {
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };
    increase = id =>{
        const { cart } = this.state
        cart.forEach(item =>{
            if (item._id === id) {
                item.count +=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };
    removeProd = id =>{
        if (window.confirm("Esta seguro de quitar este producto del carrito?")) {
            const {cart} = this.state
            cart.forEach((item, index) =>{
            if(item._id === id){
                cart.splice(index, 1)
            }
            })
            this.setState({cart: cart});
            this.getTotal();
        }
        
    };

    getTotal = () => {
        const {cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        }, 0)
        this.setState({total: res})
    }

    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };

    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if (dataCart !== null) {
            this.setState({cart: dataCart})
        }

        
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if (dataTotal !== null) {
            this.setState({total: dataTotal})
        }
    }
    
    
    render() {
        const {products, cart, total} = this.state;
        const {addCart, reduction, increase, removeProd, getTotal} = this;
        return(
            <DataContext.Provider value={{products, addCart, cart, reduction, increase, removeProd, total, getTotal}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}


//export default Context
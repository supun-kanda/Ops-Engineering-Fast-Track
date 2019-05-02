import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index.css';
import {loadItems,addItem,deleteItems} from './fetchers'

class Item extends React.Component{
    constructor(){
        super()
        this.state = {
            style:'item'
        };
    }
    _marker(){
        this.props.onClick(this.props.id)
        if(this.state.style==='item')
            this.setState({style:'item clicked'})
        else
            this.setState({style:'item'})
    }
    render(){
        return (
            <div 
                onClick={this._marker.bind(this)} 
                ref='item'
                id={this.props.id} 
                className={this.state.style}>{this.props.name}
            </div>
        );
    }
}

class List extends React.Component{
    render(){
        let items = this.props.items.map(item => 
            <Item onClick={this.props.onClick} name={item.name} id={item._id} key={item._id}/>
        );
        return (
            <div className='form'>
                {items}
            </div>
        );
    }
}

function Error(props){
    return (
        <div>
            <h1>Error</h1>
            <h2>{props.error.toString()}</h2>
        </div>
    );
}

class Controller extends React.Component{
    render(){
        return (
            <div className='form'>
                <input className="input" ref="itemName" type="text" placeholder="Enter Item Name"/>
                <button 
                    onClick={()=>this.props.onAdd({
                        userid:"48",
                        name:this.refs.itemName.value
                    })} 
                    className="button"
                >Add Item</button>
                <button onClick={()=>this.props.onDelete()} className="button">Remove Item</button>
            </div>
        );
    }
}

class Board extends React.Component{

    constructor(){
        super()
        this.state = {
            items:[],
            removingItems:[],
            error:null
        };
    }
    
    async _loader(){
        try{
            let data = await loadItems();
            this.setState({items:data});
        }catch(err){
            this.setState({error:err})
        }
    }
    
    async _adder(itemObj){
        if(!itemObj.name)
            return;
        try{
            let response = await addItem(itemObj);
            this.setState((state,props)=>({
                items:state.items.concat({
                    name:itemObj.name,
                    userid:itemObj.userid,
                    _id:response.id
                })
            }))
        }catch(err){
            this.setState({error:err})
        }
    }
        
    _marker(id){
        let removingItems = this.state.removingItems;
        var index = removingItems.indexOf(id);
        if(index<0)
            removingItems.push(id);
        else
            removingItems.splice(index, 1);
        this.setState({removingItems:removingItems});
    }

    async _deleter(){
        if(!this.state.removingItems.length)
            return;
        try{
            await deleteItems(this.state.removingItems)
            
            let items = this.state.items,
            removingItems = this.state.removingItems;

            items.forEach((item,index) => {
                let including = removingItems.includes(item._id)
                if(including){
                    items.splice(index, 1);
                }
            });
            this.setState({items:items});
            // window.location.reload();
        }catch(err){
            this.setState({error:err})
        }
    }

    componentDidMount(){
        this._loader();
    }

    render(){
        if(this.state.error)
            return <Error error={this.state.error}/>;
        return(
            <div>
                <List onClick={this._marker.bind(this)} items={this.state.items}/>
                <br />
                <Controller onAdd={this._adder.bind(this)} onDelete={this._deleter.bind(this)}/>
            </div>
        );
    }
}

ReactDOM.render(<Board/>, document.getElementById('root'));
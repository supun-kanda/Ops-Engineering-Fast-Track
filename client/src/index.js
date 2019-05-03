import React from 'react';
import ReactDOM from 'react-dom';
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
        let para;
        if(this.props.desc)
            para = <p className='para'>{this.props.desc}</p>
        return (
            <div 
                onClick={this._marker.bind(this)} 
                ref='item'
                id={this.props.id} 
                className={this.state.style}>
                <label>{this.props.name}</label>
                {para}
            </div>
        );
    }
}

class List extends React.Component{
    render(){
        if(!this.props.items.length)
            return (
                <div className='form center'>
                    <h1>No Items Yet</h1>
                </div>
            );
        let items = this.props.items.map(item => 
            <Item onClick={this.props.onClick} name={item.name} desc={item.desc} id={item._id} key={item._id}/>
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
            <div className='form control'>
                <input className="name" ref="itemName" type="text" placeholder="Enter Item Name"/>
                {/* <input ref="description" type="text" name="desc" placeholder="Enter Item Description" className="description"/> */}
                <button 
                    onClick={()=>this.props.onAdd({
                        userid:"48",
                        name:this.refs.itemName.value,
                        desc:this.refs.para.value
                    })} 
                    className="button"
                >Add Item</button>
                <button onClick={()=>this.props.onDelete()} className="button remover">Remove Items</button>
                <br/>
                <textarea placeholder="Enter Item Description" className="description" rows="4" cols="50" ref='para'></textarea>
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
                    desc:itemObj.desc,
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
            cleaned = [],
            removingItems = this.state.removingItems;
            items.forEach((item,index) => {
                let including = removingItems.includes(item._id)
                if(! including){
                    cleaned.push(item)
                    // items2.splice(index, 1);
                }
            });
            this.setState({items:cleaned});
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
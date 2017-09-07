import React, { Component} from 'react';
import {hashHistory} from 'react-router';
import SortableTbl from 'react-sort-search-table'
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; // Import 
import 'react-confirm-alert/src/react-confirm-alert.css'
var Select = require('react-select');

export default class Items extends Component
{
    constructor()
    {
        super();
        this.state={'items':[],items_list:[]}
        this.col=["id","item","unit","price"];
        this.tHead=["ID","Items","Unit","Price",];
        this.changeItem=this.changeItem.bind(this);
        this.updateEvent=this.updateEvent.bind(this);
        this.updateItem=this.updateItem.bind(this);
        this.deleteItem=this.deleteItem.bind(this);
        this.addItem=this.addItem.bind(this);
        this.itemsMenu=[];
    }
    componentDidMount()
    {
    
        this.itemsMenu=JSON.parse(localStorage.getItem('item_list'));
        this.setState({cur_item:"",cur_price:0,cur_qty:0,item_name:"",
        cur_unit:"",new_cur_price:0,new_item_name:"",
        new_cur_unit:""})   

           setTimeout(function(){
               if(this.itemsMenu==null) this.itemsMenu=[];
                    var i=0,list=[];
                 for(i=0;i<this.itemsMenu.length;i++)
                    {
                     list.push({value:this.itemsMenu[i]['id'],label:this.itemsMenu[i]['item']})
                    }
              this.setState({items_list:list});
             }.bind(this),1000)
    }
    updateEvent(e)
    {
        this.setState({[e.target.name]: e.target.value});
    }
    updateItem()
    {
      
        if(this.state.cur_item=="")
        {
            alert("Check Inputs");
        }
        else
        {
        for(var i=0;i<this.itemsMenu.length;i++)
       {
           if(this.itemsMenu[i]['id']==this.state.cur_item)
           {
               this.itemsMenu[i]['price']=this.state.cur_price;
               this.itemsMenu[i]['qty']=this.state.cur_qty;
               break;
           }
       }
       localStorage.setItem('item_list',JSON.stringify(this.itemsMenu));
       setTimeout(()=>{alert("Item Updated")},1000);
        }
      
    }
    addItem()
    {
        this.itemsMenu.push({id:this.itemsMenu.length,item:this.state.new_item_name,
        price:this.state.new_cur_price,unit:this.state.new_cur_unit});
        setTimeout(()=>{
               localStorage.setItem('item_list',JSON.stringify(this.itemsMenu));
             alert("Done added item!");
        },1500);
       
    }
    changeItem(val)
    {
        
        if(val!=null && val!="")
              {
                
                this.itemsMenu.filter((item)=>{
                    if(item.id==val.value)
                    {
                         this.setState({cur_item:val.value,cur_price:item.price,cur_unit:item.unit,
                             item_name:item.item});
                    }
                })
              }
    }
    deleteItem()
    {
      confirmAlert({
      title: 'Delete Action',                      
      message: 'Are you sure to do this.',             
      childrenElement: () => <div></div>,       
      confirmLabel: 'Confirm',                         
      cancelLabel: 'Cancel',                            
      onConfirm: () => {
         
            for(var i=0;i<this.itemsMenu.length;i++)
            {
                if(this.itemsMenu[i]['id']==this.state.cur_item)
                {
                 
                    delete this.itemsMenu[i];
                    this.itemsMenu=this.itemsMenu.filter(function(){return true})
                    break;
                }
            }
            
            setTimeout(function(){
            
                localStorage.setItem('item_list',JSON.stringify(this.itemsMenu));
                alert("Done deletion");
                }.bind(this),1200)
        
        }, 
        onCancel: () =>{},    
        })

    }
    render()
    {
        return(
            <div className="app">
             <div className="container-fluid" style={{backgroundColor:'white'}}>
          <div className="row" style={{minHeight:'100'+'px',backgroundColor:'#3498db',
          margin:'inherit',padding:'inherit',paddingTop:25}}>
          <div className="col-md-2">
             <h1 style={{color:'#fff',fontWeight:'bold',marginTop:'2'+'%'}}>FASTBILL</h1>
          </div>

            <div className="col-md-offset-2 col-md-3" style={{paddingTop:10}}>
          
              <button className="btn btn-default" onClick={()=>{
                hashHistory.push('/');
                }}>Back To Biller</button>

                 <button type="button" className="btn btn-info" 
                 data-toggle="modal" data-target="#myModal">Add NewItem</button>

            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
            <SortableTbl tblData={this.itemsMenu}
			tHead={this.tHead}
            customTd={[
                   
                    ]}
			dKey={this.col}
			search={true}
			defaultCSS={true}
		/></div>
    
            
            <div className="col-md-4 col-md-offset-1" style={{paddingTop:40}}>
            
                <div className="panel panel-primary">
                <div className="panel-heading">Edit Items</div>
                <div className="panel-body">

                    <div className="col-md-12">
                        <label htmlFor="fullname" style={{marginTop:10}}>Item Name</label>
                        <Select.Async
                          ref={(input) => { this.nameInput = input; }} 
                          name="itemslist"
                          value={this.state.cur_item}
                          loadOptions={(input,callback)=>{

                               setTimeout(function() {
                                  callback(null, {
                                    options: this.state.items_list,
                                    complete: true
                                  });
                                }.bind(this), 1000);      
                          
                          }}
                          onKeyPress={(e)=>{
                              if(e.key=='Enter')
                              {
                                this.refs.qty.focus();
                              }
                          }}
                          onChange={this.changeItem}
                      />
                        </div>

                        <div className="col-md-12">
                        <label htmlFor="fullname" style={{marginTop:10}}>Item Name</label>
                        <input type="text" id="fullname" name="item_name" value={this.state.item_name} 
                        onChange={this.updateEvent} 
                         placeholder="Item Name" 
                         ref='itemname'
                        className="form-control" required />
                        </div>


                        <div className="col-md-6">
                        <label htmlFor="fullname" style={{marginTop:10}}>Unit</label>
                        <input type="text" id="fullname" name="cur_unit" value={this.state.cur_unit}
                         onChange={this.updateEvent} 
                         placeholder="Unit" 
                         ref='unit'
                        className="form-control" required />
                        </div>

                        <div className="col-md-6">
                        <label htmlFor="fullname" style={{marginTop:10}}>Price</label>
                        <input type="text" id="fullname" name="cur_price" value={this.state.cur_price} onChange={this.updateEvent} 
                         placeholder="0.00" 
                         ref='price'
                        className="form-control"  required />
                        </div>

                         <div className="col-md-6" style={{padding:16}}>
                        <button className="btn btn-danger btn-lg"
                        onClick={this.deleteItem}>Delete Item</button>
                        </div>

                        <div className="col-md-6" style={{padding:16}}>
                        <button className="btn btn-primary btn-lg"
                        onClick={this.updateItem}>Update Item</button>
                        </div>

                        

                      
                      </div>


                </div>
                </div>
            
            </div>


              <div className="modal fade" id="myModal" role="dialog">
    <div className="modal-dialog">
    
  
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">Modal Header</h4>
        </div>
        <div className="modal-body">
          <div className="row">
              <div className="col-md-12">
                        <label htmlFor="fullname" style={{marginTop:10}}>Item Name</label>
                        <input type="text" id="fullname" name="new_item_name" value={this.state.new_item_name} 
                        onChange={this.updateEvent} 
                         placeholder="Item Name" 
                         ref='itemname'
                        className="form-control" required />
                        </div>


                        <div className="col-md-6">
                        <label htmlFor="fullname" style={{marginTop:10}}>Unit</label>
                        <input type="text" id="fullname" name="new_cur_unit" value={this.state.new_cur_unit}
                         onChange={this.updateEvent} 
                         placeholder="Unit" 
                         ref='unit'
                        className="form-control" required />
                        </div>

                        <div className="col-md-6">
                        <label htmlFor="fullname" style={{marginTop:10}}>Price</label>
                        <input type="text" id="fullname" name="new_cur_price" value={this.state.new_cur_price} 
                        onChange={this.updateEvent} 
                         placeholder="0.00" 
                         ref='price'
                        className="form-control"  required />
                        </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
           <button type="button" className="btn btn-primary" onClick={this.addItem}>Save Item</button>
        </div>
      </div>
      
    </div>
  </div>
            
            
          </div></div>
       
        )
    }
}
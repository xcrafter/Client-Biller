import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import {Link,hashHistory} from 'react-router';
import SelectSearch from 'react-select-search';
import 'react-select/dist/react-select.css';
var Select = require('react-select');


class App extends Component {
  
  constructor()
  {
        super();   
        this.changeItem=this.changeItem.bind(this);
        this.state={order_id:"",mobno:"",customer_name:"",order_type:"",delivery_address:"",delivery_charge:0,netAmount:0,
        delivered_by:"BOSE",total:0,items:[],cur_item:"",cur_label:"",cur_qty:0,cur_unit:"",cur_price:0,imagelist:""}
        this.round=this.round.bind(this);
        this.submitInvoice=this.submitInvoice.bind(this);
        this.deleteItem=this.deleteItem.bind(this);
        this.getListOptions=this.getListOptions.bind(this);
        this.pushItem=this.pushItem.bind(this);
        this.calculateNet=this.calculateNet.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.calculateTotal=this.calculateTotal.bind(this);
        this.handleEnter=this.handleEnter.bind(this);
        this.calculateTotalQty=this.calculateTotalQty.bind(this);
        this.alertOptions = {
        offset: 14,
        position: 'bottom left',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
      };
     
        this.itemsMenu=[];
        this.itemsCart=new Array();
  }

  handleEnter(e)
  {
    if(e.key=='Enter')
    {
      switch(e.target.name)
      {
        case 'cur_unit':this.refs.price.focus();break;
        case 'cur_qty':this.refs.unit.focus();break;
        case 'cur_price':this.refs.total.focus();break;
        
      }
    }
  }
  
   submitInvoice()
      {
         //var bridge=new RequesBridge();
         var dataStream ={};
         dataStream['items']=this.state.items;
         dataStream['total']=this.state.total;
         localStorage.setItem('items',JSON.stringify(dataStream));
         hashHistory.push('/print');

      }

        deleteItem(id)
        {
        
         var redAmount=this.round(this.state.netAmount)-this.round(this.itemsCart[id]['item_total']);
         var totAmount=this.round(this.state.total)-this.round(this.itemsCart[id]['item_total']);
         delete this.itemsCart[id];
         this.itemsCart=this.itemsCart.filter(function(){return true;});
         this.setState({items:this.itemsCart,netAmount:redAmount,total:totAmount});
        }
        calculateNet(e)
        {
            this.setState({[e.target.name]: e.target.value});
            var net=this.round(this.state.total)+this.round(e.target.value);
            this.setState({netAmount:net}) 
        }
        getListOptions(inputValue,callback)
        {
          

        }

           changeItem(val)
            {
              if(val!=null && val!="")
              {
                   this.setState({cur_item:val.value,cur_label:val.label});
                this.itemsMenu.filter((item)=>{
                    if(item.id==val.value)
                    {
                         this.setState({cur_item:val.value,cur_price:item.price,cur_unit:item.unit});
                    }
                })
              }
               
            }

            
    
            pushItem(e)
            {
            
                if(e.key=='Enter' && (this.state.cur_total!==undefined && !isNaN(this.state.cur_total) && 
                this.state.cur_total!=0))
                {
              
                  var test=1,i=0;
                
                  for(i=0;i<this.itemsCart.length;i++)
                  {
                    if(this.itemsCart[i]['item_id']==this.state.cur_item)
                    {
                      var totalQty=parseFloat(this.itemsCart[i]['item_qty'])+parseFloat(this.state.cur_qty);
                      var total=this.round(totalQty*this.state.cur_price);
                      this.setState({cur_total:total});
                      var ftotal=this.round(this.state.total- this.itemsCart[i]['item_total']+total);
                      this.itemsCart[i]['item_qty']=totalQty;
                      this.itemsCart[i]['item_price']=this.state.cur_price;
                      this.itemsCart[i]['item_total']=total;
                      this.setState({total:ftotal,cur_item:"",cur_label:"",cur_qty:"",cur_unit:"",cur_price:"",cur_total:"",
                      netAmount:total+this.round(this.state.delivery_charge)}) ;
                      test=2;
                      break;
                    }
                  }
                  if(test==1)
                  {
                  this.itemsCart.push({item_id:this.state.cur_item,item_name:this.state.cur_label,item_qty:this.state.cur_qty,
                  item_price:this.state.cur_price,item_unit:this.state.cur_unit,
                   item_total:this.state.cur_total});
                   var price=this.round(this.state.total+this.state.cur_total);
                   this.setState({total:price,cur_item:"",cur_label:"",cur_qty:"",cur_unit:"",cur_price:"",cur_total:"",
                netAmount:price+this.round(this.state.delivery_charge)}) ;
                  }
                 
                  this.setState({items:this.itemsCart})
                this.nameInput.focus(); 
              }
              else
              {
                alert("Please Enter Valid Input");
              }
              
                
            }
        componentDidMount()
        {
           
             this.itemsMenu=JSON.parse(localStorage.getItem('item_list'));
             setTimeout(function(){
              
               if(this.itemsMenu==null) this.itemsMenu=[];
                 for(i=0;i<this.itemsMenu.length;i++)
                    {
                      list.push({value:this.itemsMenu[i]['id'],label:this.itemsMenu[i]['item']})
                    }
              this.setState({items_list:list});
             }.bind(this),2000)
            

            this.setState({order_id:"",customer_name:"",mobno:"",order_type:"",delivery_address:""});
            var i=0;
            var list=new Array();
            //this.itemsMenu=items;
            if(localStorage.getItem('items')!=null)
              {
            
              var stream= localStorage.getItem('items');
              var itemsList=JSON.parse(stream);
              this.setState({items:itemsList['items'],total:itemsList['total']});
              this.itemsCart=itemsList['items'];
              }
          
              }

            

  handleChange(e)
  {
       this.setState({[e.target.name]: e.target.value});
       
  }
    calculateTotalQty(e)
  {
      this.setState({[e.target.name]: e.target.value});
      var total=this.round((Number(this.state.cur_qty))*e.target.value);
      this.setState({cur_total:total});
  }
  calculateTotal(e)
  {
      this.setState({[e.target.name]: e.target.value});
      var total=this.round((Number(this.state.cur_price))*e.target.value);
      this.setState({cur_total:total});
  }
  round(value) {
    return Number(Math.round(value + 'e' + 2) + 'e-' + 2);
}

  render() {
    return (
      <div className="App">
        <div className="container-fluid" style={{backgroundColor:'white'}}>
          <div className="row" style={{minHeight:'100'+'px',backgroundColor:'#3498db',
          margin:'inherit',padding:'inherit',paddingTop:25}}>
          <div className="col-md-2">
             <h1 style={{color:'#fff',fontWeight:'bold',marginTop:'2'+'%'}}>FASTBILL</h1>
          </div>

            <div className="col-md-offset-0 col-md-4" style={{paddingTop:10}}>
          
              <button className="btn btn-default" onClick={this.submitInvoice}>Print Now</button>
              <button className="btn btn-default" onClick={()=>{localStorage.setItem('item',null);this.setState({items:[],total:0.00});
                this.itemsCart=[];
                }}>Clear Bills</button>
              <button className="btn btn-default" onClick={()=>{
                 var dataStream ={};
                  dataStream['items']=this.state.items;
                  dataStream['total']=this.state.total;
                  localStorage.setItem('items',JSON.stringify(dataStream));
                hashHistory.push('/ext');
                }}>Setup</button>

                <button className="btn btn-default" onClick={()=>{
                   var dataStream ={};
         dataStream['items']=this.state.items;
         dataStream['total']=this.state.total;
         localStorage.setItem('items',JSON.stringify(dataStream));
                hashHistory.push('/items');
                }}>Items Master</button>
            </div>

             <div className="col-md-offset-1 col-md-4">
             <h1 style={{color:'#fff',fontWeight:'bold',marginTop:'1'+'%',textAlign:'center'
            }}>
               {(this.state.total).toFixed(2)}
              </h1>
          </div>
         
          </div>
           <div className="row" style={{padding:6,paddingBottom:10,borderColor:'#039BE5',
           border:'2px solid #3F51B5',backgroundColor:'#FAFAFA',margin:2,marginTop:15}}>
                       
                             <div className="col-md-3 col-md-offset-1">
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
                                }.bind(this), 500);      
                          
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

                        <div className="col-md-1">
                        <label htmlFor="fullname" style={{marginTop:10}}>Qty</label>
                        <input type="text" id="fullname" name="cur_qty" value={this.state.cur_qty} onChange={this.calculateTotal} 
                         placeholder="0.00" 
                        ref='qty'
                         onKeyPress={this.handleEnter}
                        className="form-control"  required />
                        </div>

                        
                        <div className="col-md-1">
                        <label htmlFor="fullname" style={{marginTop:10}}>Unit</label>
                        <input type="text" id="fullname" name="cur_unit" value={this.state.cur_unit} onChange={this.calculateTotal} 
                         placeholder="0.00" 
                         ref='unit'
                         onKeyPress={this.handleEnter}
                        className="form-control" required />
                        </div>

                        <div className="col-md-2">
                        <label htmlFor="fullname" style={{marginTop:10}}>Price</label>
                        <input type="text" id="fullname" name="cur_price" value={this.state.cur_price} onChange={this.calculateTotalQty} 
                         placeholder="0.00" 
                         ref='price'
                         onKeyPress={this.handleEnter}
                        className="form-control"  required />
                        </div>

                          <div className="col-md-3">
                        <label htmlFor="fullname" style={{marginTop:10}}>Total</label>
                        <input type="text" id="fullname" name="cur_total" value={this.state.cur_total} onKeyPress={this.pushItem} 
                         placeholder="0.00" 
                         ref='total'
                        className="form-control"  required readOnly />
                        </div>
                      </div>


                      <div className="row" style={{minHeight:500,margin:2}}>

                       <div className="table-responsive"><br/>
                      <table className="table table-striped jambo_table bulk_action">
                        <thead>
                          <tr className="headings">
                           
                            <th className="column-title">ID </th>
                            <th className="column-title">Item Name</th>
                            <th className="column-title">Qty </th>
                            <th className="column-title">Unit </th>
                            <th className="column-title">Price</th>
                            <th className="column-title">Total </th>
                            <th className="column-title no-link last"><span className="nobr">Action</span>
                            </th>
                          </tr>
                        </thead>

                        <tbody>

                         {this.state.items.map((list,index)=>
                         { 
                             
                            return <tr key={index}>
                                <td>{index+1}</td>
                                <td>{list.item_name}</td>
                                <td>{list.item_qty}</td>
                                <td>{list.item_unit}</td>
                                <td>{list.item_price}</td>
                                <td>{list.item_total}</td>
                                <td>
                                  <div onClick={()=>{this.deleteItem(index)}} style={{ cursor: 'pointer'}}><i className="fa fa-trash-o" aria-hidden="true"></i>Delete</div>
                                </td>
                            </tr>
                         })}
                        </tbody>
                      </table>
                    </div>
                      </div>

        <div className="row">

        <div className="col-md-4">

      

        </div>

        

       

           
        </div>


                      </div>
                      </div>
     
    );
  }
}

export default App;

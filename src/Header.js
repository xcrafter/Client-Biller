import React, { Component} from 'react';
import ReactDOM from 'react-dom';

export default class Header extends Component
{
    render(){
        return(
            <div className="row" style={{minHeight:'100'+'px',backgroundColor:'#3498db',
          margin:'inherit',padding:'inherit',paddingTop:25}}>
          <div className="col-md-2">
             <h1 style={{color:'#fff',fontWeight:'bold',marginTop:'2'+'%'}}>FASTBILL</h1>
          </div>

            <div className="col-md-offset-2 col-md-3" style={{paddingTop:10}}>
          
              <button className="btn btn-default" onClick={this.submitInvoice}>Print Now</button>
              <button className="btn btn-default" onClick={()=>{localStorage.setItem('item',null);this.setState({items:[],total:0.00});
                this.itemsCart=[];
                }}>Clear Bills</button>
              <button className="btn btn-default" onClick={()=>{
                hashHistory.push('/ext');
                }}>Setup</button>
            </div>

             <div className="col-md-offset-1 col-md-4">
             <h1 style={{color:'#fff',fontWeight:'bold',marginTop:'1'+'%',textAlign:'center'
            }}>
               {(this.state.total).toFixed(2)}
              </h1>
          </div>
          </div>
        );
    }
}
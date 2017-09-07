import React, { Component } from 'react';
export default class Print extends Component
{
    constructor()
    {
      super();
      this.state={items:[],total:0.00}
      this.printDate=this.printDate.bind(this);
    }
    componentDidMount()
    {
      console.log(localStorage.getItem('items'))
      var stream= localStorage.getItem('items');
      var itemsList=JSON.parse(stream);
      console.log(itemsList['items']);
      this.setState({items:itemsList['items'],total:itemsList['total']});
      setTimeout(()=>{window.print()},400);
    }
    printDate()
    {
      var currentDate = new Date()
      var day = currentDate.getDate()
      var month = currentDate.getMonth() + 1
      var year = currentDate.getFullYear()
      return day + "/" + month + "/" + year
    }
    render()
    {
        return(<code>
         <div className="container-fluid" style={{fontFamily: 'Consolas',
            color:'#999',
            fontSize: 14+'px'
      }}>
    
          <div className="row">
            <h4 style={{textAlign:'right'}}>{this.printDate()}</h4>
            <h1 style={{textAlign:"center"}}>Estimate</h1>
            <hr style={{color:"#000"}}/>
            </div>
            
            <div class="row">

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
                          </tr>
                        </thead>

                        <tbody>

                         {this.state.items.map((list,index)=>
                         { 
                             
                            return <tr key={index}>
                                <td style={{padding:2}}>{index+1}</td>
                                <td style={{padding:2}}>{list.item_name}</td>
                                <td style={{padding:2}}>{list.item_qty}</td>
                                <td style={{padding:2}}>{list.item_unit}</td>
                                <td style={{padding:2}}>{list.item_price}</td>
                                <td style={{padding:2}}>{list.item_total}</td>
                            </tr>
                         })}   
                         
                        </tbody>
                      </table>
                    </div>
                      </div>

        </div>
        <div className="row">
          <div className="col-md-3 col-md-offset-10 pull-right" style={{fontSize:24,marginRight:25,textAlign:'center'}}>
           Total<br/>
           <span style={{textAlign:'center',fontSize:40}}>{this.state.total.toFixed(2)}</span>
          </div>
        </div>
        </code>);
    }
}
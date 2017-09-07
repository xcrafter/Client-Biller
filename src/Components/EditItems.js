import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import jsonQuery from 'json-query'

export default class EditItems extends Component
{
    constructor(props)
    {
        super(props);
        this.editItem=this.editItem.bind(this);
    }
    editItem()
    {
        console.log("hell");
        console.log(this.state);
        //var result=jsonQuery('id='+id+'.name',{data:this.state.items_list});
        //console.log(result);
    }
    render () {
        return (	
            <td>	
                <input type="button" className="btn btn-warning" value="Edit"
                 onClick={this.editItem}/>
            </td>
        );
    }
}
EditItems.prototype=
{
    rowData: React.PropTypes.object,
    tdData: React.PropTypes.string,
}
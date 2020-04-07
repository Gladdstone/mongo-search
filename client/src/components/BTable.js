import React from 'react';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import '../App.css';

class BTable extends React.Component {

   constructor(props) {
      super(props);
      
   }

   renderResultsData() {
      const sites = this.props.results;
      return sites.results.map((site, index) => {
         const { site_name, description } = site._source
         return (
            <tr key={site_name}>
               <th>{site_name}</th>
               {/* <th>{description}</th> */}
               <th><Link to={`/details/${site_name}`}>Show details</Link></th>
            </tr>
         );
      });
    }

 render() {
    return (
      <div class="mt-5 px-3">
          <Table hover>
            <thead>
               <tr>
                  <th>Facility Name</th>
                  {/* <th>Description</th> */}
                  <th></th>
               </tr>
            </thead>
               <tbody>
                  {this.renderResultsData()}
               </tbody>
          </Table>
       </div>
    )
 }
}

export default BTable;


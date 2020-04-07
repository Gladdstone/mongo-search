import React, {useState} from 'react';
import axios  from 'axios';
import { Link } from "react-router-dom";
import SiteDetails from '../components/SiteDetails';


const DetailPage = ({ match }) => {
    const {
      params: { siteKey },
    } = match;

    const key = siteKey

    return (
        <div class="m-5">
            <Link to={`/`}>&lsaquo; Go back to Search</Link>
            <SiteDetails siteKey={siteKey}/>
        </div>
    );
  };

export default DetailPage;
import React from 'react';
import axios  from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText, Spinner} from 'reactstrap';


export default class SiteDetails extends React.Component {

    
    constructor(props) {
        super(props);    
        this.state = {
            siteKey: '',
            siteResults: {},
            newComment: '',
            loading: true
            
          };
        this.username = '';
        this.newComment ='';

    } 

   
    
    componentDidMount(){
        this.setState({
            siteKey: this.props.siteKey,
        });
        this.searchSelect();
    }

    searchSelect = () =>{
        this.setState({
            loading: true
        });
        axios({
          method: 'POST',
          url: `http://localhost:3000/searchSelect?siteName=${this.props.siteKey}`,
        }).then(({ data }) => {
            this.setState({
                siteResults: data.data[0]
            })
            console.log(this.state.siteResults);
          });

          this.setState({
            loading: false
        });
        
          
      }

    insertComment = () =>{
        axios({
            method: 'POST',
            url: `http://localhost:3000/insertComment?siteName=${this.props.siteKey}&author=${this.username}&desc=${this.newComment}`,
          }).then(({ data }) => {
              
            
        });
        
        this.componentDidMount();
    }

    checkComment = () =>{
        if(this.username.length > 0 && this.newComment.length > 0){
            this.insertComment();
            alert("Comment Created!")
        }else{
            alert("Please fill both fields to create a comment");
        }
        
    }


    renderDetails(){
        if(Object.keys(this.state.siteResults).length > 0){
        
           

        return(
            <div>
                <h3>{this.state.siteResults.site_name} </h3>
                <hr/>
                {/* Site Score */}
                <p>
                    <span class ="h5">Site Score: </span> <span>{this.state.siteResults.site_score}</span>
                </p>
                <hr/>
                {/* Address */}
                <p>
                    <span class="h5">Address: </span>
                    <span>{this.state.siteResults.address}</span>
                </p>
                <hr/>
                {/* City */}
                <p>
                    <span class="h5">City: </span>
                    <span>{this.state.siteResults.city}</span>
                </p>
                <hr/>
                {/* About */}
                <h5>About:</h5>
                <p>{this.state.siteResults.description}</p>
                <hr/>
                {/* More Info */}
                <h5><a href={this.state.siteResults.moreinfo} target="_blank">Click for More Info</a></h5>
                <hr/>
                <img src={this.state.siteResults.gridfsfile} />
                {/* Comments */}
                <h5>Comments</h5>
                <hr/>
                <div>{this.renderComments()}</div>
                <Form class="mt-4">
                        <FormGroup>
                            <Label>Username</Label>
                            <Input type="text" name="username" onChange={this.handleUserNameChange} placeholder="Enter Username" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Comment: </Label>
                            <Input type="textarea" name="comment" onChange={this.handleCommentChange} placeholder="Add a Comment" required />
                        </FormGroup>
                        
                </Form>  
                <button class="btn btn-success" onClick={this.checkComment}>Add Comment</button>
                
            </div>
        );

        }
    }

    handleUserNameChange = (event)=>{
        this.username = event.target.value;
    }

    handleCommentChange = (event)=>{
        this.newComment = event.target.value;
    }


    renderComments(){
        return this.state.siteResults.comments.map((com, index) => {
            return(
                
                <div class="mx-3 my-4">
                    <p class="h6"><strong>{com.author}</strong></p>
                    <p class="px-3">{com.desc}</p>
                    <hr/>
                </div>
                
            );
        });
    }

      render(){
          if(this.state.loading) return <p class="w-100"><Spinner class="mx-auto p-5" animation="grow"/></p>
          return(
            <div class="pt-4">
                
                <div>{this.renderDetails()}</div>
                
            </div>
       
          );
      }
}
import React from 'react';



class BookDisplayCard extends React.Component {

    render(){
            
            return (
                <div>
                    Info Here
                    {this.props.bookInfo.description._cdata}
                </div>
                
            );
    };
}


export default BookDisplayCard;
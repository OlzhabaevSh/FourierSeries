import React from "react";
import './card.css'

interface ICardProps {
    title: string
}

interface ICardState{

}

class Card extends React.Component<ICardProps, ICardState> {
    render(){
        return (<div className="card">
            <div className="card-header"><h3>{this.props.title}</h3></div>
            <div className="card-body">{this.props.children}</div>
        </div>);
    }
}

export default Card;
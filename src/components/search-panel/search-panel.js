import React from "react";

class SearchPanel extends React.Component {
    state = {
        term: ''
    }

    changeTerm = ({target:{value}}) => {
        this.setState({term: value});
        const {changeSearchHandle} = this.props;
        changeSearchHandle(value)
    }

    render() {
        const {term} = this.state;

        return (
            <input
                className="form-control search-input"
                type="search"
                placeholder="поиск"
                value={term}
                onChange={this.changeTerm}
            />
        )
    }
};

export default SearchPanel;
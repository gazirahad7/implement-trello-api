import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
export default class Form extends React.Component {
    state = {
        title: 'Javascript',
        text: 'React is awesome',
        library: 'React',
        isChecked: true,
    };

    //
    handleChange = (e) => {
        // console.log(e.target.value);
        if (e.target.type === 'text') {
            this.setState({ title: e.target.value });
        } else if (e.target.type === 'textarea') {
            this.setState({ text: e.target.value });
        } else if (e.target.type === 'select-one') {
            this.setState({ library: e.target.value });
        } else if (e.target.type === 'checkbox') {
            this.setState({ isChecked: e.target.checked });
        }

        // this.setState({
        //     [e.target.name]: e.target.value,
        // });
    };

    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.state);
    };

    render() {
        const { title, text, library, isChecked } = this.state;
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <input
                        type="text"
                        placeholder="Enter the value"
                        value={title}
                        onChange={this.handleChange}
                    />
                    <p>{title}</p>

                    <textarea name="text" value={text} onChange={this.handleChange} />
                    <br />
                    <br />
                    <select value={library} onChange={this.handleChange}>
                        <option value="React">React ddd</option>
                        <option value="Angular">Angular</option>
                    </select>
                    <br />
                    <br />

                    <input type="checkbox" checked={isChecked} onChange={this.handleChange} />

                    <br />
                    <br />
                    <input type="submit" value="submit" />
                </form>
            </div>
        );
    }
}

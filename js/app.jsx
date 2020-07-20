import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
  constructor() {
    super();
    this.state = {
      balance: 0,
      rate: 0,
      term: 15,
      mortgage: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    this.setState({ [name]: value });
  }

  calculate(event) {
    event.preventDefault();
    let { balance, rate, term } = this.state;
    rate = rate / 100 / 12;
    term = term * 12;

    const power = Math.pow(1 + rate, term);
    const mortgage = ((balance * power * rate)/(power - 1)).toFixed(2);
    const mortgageString = `$${mortgage} is your payment.`;

    this.setState({ mortgage: [mortgageString] });

  }

  render() {
    return (
      <div className='container'>
        <form className="form-horizontal">
          <h3>Mortgage Calculator</h3>
          <div className="form-group">
            <label className="col-sm-2 control-label">Loan Balance</label>
              <div className="col-sm-10">
                <input 
                  type="number" 
                  value={ this.state.balance }
                  onChange={ this.handleChange }
                  className="form-control"
                  id="balance"
                  name="balance"/>
              </div>
              
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Interest Rate (%)</label>
            <div className="col-sm-10">
              <input 
                type="number"
                value={ this.state.rate }
                onChange={ this.handleChange }
                className="form-control"
                step="0.01"
                id="rate"
                name="rate"/>
            </div>
            
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Loan Term (years)</label>
            <div className="col-sm-10">
              <select
                value={ this.state.term }
                onChange={ this.handleChange }
                id="term"
                name="term"
                className="form-control">
                <option>15</option>
                <option>30</option>
              </select>
            </div>
            
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button 
                onClick={ this.calculate }
                className="btn btn-primary"
                id="submit"
                name="submit">
              Calculate
              </button>
            </div>
          </div>

          <div className="form-group" id="output" name="output">
            { this.state.mortgage }
          </div>

        </form>
      </div>
    );
  }
}
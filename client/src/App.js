import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Privatekonomi</h1>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <form>
              <div className="form-group">
                <input type="number" className="form-control form-control-lg" placeholder="Kostnad" />
              </div>
              <div className="form-check">
                <input type="radio" className="form-check-input" name="typeRadios" id="foodRadio" 
                  value="food" checked />
                <label class="form-check-label" for="foodRadio">
                  Mat
                </label>
              </div> 
              <div className="form-check margin-bottom">
                <input type="radio" className="form-check-input" name="typeRadios" id="savingsRadio" 
                  value="savings" />
                <label class="form-check-label" for="savingsRadio">
                  Sparande
                </label>
              </div>
              <button type="submit" class="btn btn-success btn-lg">Submit</button> 
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

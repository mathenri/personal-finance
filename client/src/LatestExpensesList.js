import React, {Component} from 'react';

class LatestExpensesList extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <ul className="list-group">
            {this.props.expenses.map((item, i) => 
              <li 
                className="list-group-item" 
                key={i}>
                  <strong>{item.amount} kr</strong> - <span style={{color: this.props.expenseTypeColors[item.type]}}>{this.props.expenseTypeTranslations[item.type]}</span> - {item.created_date.slice(0,10)}
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default LatestExpensesList;
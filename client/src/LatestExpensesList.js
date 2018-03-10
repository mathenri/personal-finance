import React, {Component} from 'react';

class LatestExpensesList extends Component {
  render() {
    return (
      <div className="row margin-top">
        <div className="col">
        <h2>Senast rapporterade kostnader</h2>
          <ul className="list-group">
            {this.props.expenses.map((item, i) => 
              <li 
                className="list-group-item" 
                key={i}>
                  <strong>{item.amount} kr</strong> - <span className={this.props.expenseTypeColorClasses[item.type]}>{this.props.expenseTypeTranslations[item.type]}</span> - {item.created_date.slice(0,10)}
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default LatestExpensesList;
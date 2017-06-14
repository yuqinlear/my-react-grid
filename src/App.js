import React from 'react';
// import * as Grid, {ReactDataGrid} from 'react-data-grid'
import ReactDataGrid, {Row} from 'react-data-grid'

const RowRenderer = React.createClass({
    propTypes: {
        idx: React.PropTypes.number.isRequired
    },

    setScrollLeft(scrollBy) {
        // if you want freeze columns to work, you need to make sure you implement this as apass through
        this.row.setScrollLeft(scrollBy);
    },

    getRowStyle() {
        return {
            color: this.getRowBackground(),
            display: 'none'
        };
    },

    getRowBackground() {
        return this.props.idx % 2 ?  'green' : 'blue';
    },

    render: function() {
        // here we are just changing the style
        // but we could replace this with anything we liked, cards, images, etc
        // usually though it will just be a matter of wrapping a div, and then calling back through to the grid
        return (<div style={this.getRowStyle()}><Row ref={ node => this.row = node } {...this.props}/></div>);
    }
});


const App = React.createClass({
  getInitialState() {
      this.createRows();
      this._columns = [
          { key: 'id', name: 'ID' },
          { key: 'title', name: 'Title' },
          { key: 'count', name: 'Count' } ];

      return null;
  },

  createRows() {
      let rows = [];
      for (let i = 1; i < 5; i++) {
          rows.push({
              id: i,
              title: 'Title ' + i,
              count: i * 1000
          });
      }
      rows.push({
          id:6,
          title: 'Title ' + 6,
          count: 6,
      })
      this._rows = rows;
  },

  rowGetter(i) {
      return this._rows[i];
  },

  getHeaderRows(): Array<{ref: Function; height: number;}> {
      let rows = [{ ref: (node) => this.row = node, height: 0, rowType: 'header' }];
      if (this.state.canFilter === true) {
          rows.push({
              ref: (node) => this.filterRow = node,
              filterable: true,
              onFilterChange: this.props.onAddFilter,
              height: this.props.headerFiltersHeight,
              rowType: 'filter'
          });
      }
      return rows;
  },


  render() {
      return  (
          <ReactDataGrid
              columns={this._columns}
              rowGetter={this.rowGetter}
              rowsCount={this._rows.length}
              rowRenderer={RowRenderer}
              minHeight={500} />);
  }
});

export default App;

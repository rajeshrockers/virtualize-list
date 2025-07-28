import React, { useMemo } from 'react';
import { Grid, ScrollSync } from 'react-virtualized';
import 'react-virtualized/styles.css';

const rowCount = 1000;
const columnCount = 50;
const rowHeight = 40;
const columnWidth = 120;
const frozenColumnCount = 2;

const getCellData = (rowIndex: number, columnIndex: number) => `R${rowIndex} C${columnIndex}`;

const VirtualizedFrozenTable: React.FC = () => {
  const data = useMemo(() =>
    Array.from({ length: rowCount }, (_, row) =>
      Array.from({ length: columnCount }, (_, col) => getCellData(row, col))
    ), []
  );

  const renderCell = ({ columnIndex, key, rowIndex, style }: any) => (
    <div
      key={key}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: rowIndex === 0 ? '#ddd' : (rowIndex % 2 ? '#fff' : '#f7f7f7'),
        fontWeight: rowIndex === 0 ? 'bold' : 'normal',
        border: '1px solid #ccc',
        zIndex: rowIndex === 0 ? 2 : 1,
      }}
    >
      {data[rowIndex][columnIndex]}
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <ScrollSync>
        {({ onScroll, scrollLeft, scrollTop }) => (
          <div style={{ display: 'flex', flex: 1 }}>
            <div>
              <Grid
                cellRenderer={renderCell}
                columnCount={frozenColumnCount}
                columnWidth={columnWidth}
                height={600}
                rowCount={rowCount}
                rowHeight={rowHeight}
                width={frozenColumnCount * columnWidth}
                scrollTop={scrollTop}
              />
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <Grid
                cellRenderer={renderCell}
                columnCount={columnCount - 2 * frozenColumnCount}
                columnWidth={columnWidth}
                height={600}
                rowCount={rowCount}
                rowHeight={rowHeight}
                width={window.innerWidth - (frozenColumnCount * 2 * columnWidth)}
                onScroll={onScroll}
                scrollLeft={scrollLeft}
                scrollTop={scrollTop}
              />
            </div>
            <div>
              <Grid
                cellRenderer={({ columnIndex, ...rest }) =>
                  renderCell({ ...rest, columnIndex: columnCount - frozenColumnCount + columnIndex })
                }
                columnCount={frozenColumnCount}
                columnWidth={columnWidth}
                height={600}
                rowCount={rowCount}
                rowHeight={rowHeight}
                width={frozenColumnCount * columnWidth}
                scrollTop={scrollTop}
              />
            </div>
          </div>
        )}
      </ScrollSync>
    </div>
  );
};

export default VirtualizedFrozenTable;

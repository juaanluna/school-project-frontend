import React, { useContext } from 'react';
import PropTypes from "prop-types";
import './table.css';
import { Container, Button, Table as Tabela } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import { FaPen } from 'react-icons/fa'
import { ThemeContext } from 'styled-components';

const Table = ({
  buttonTitle,
  firstTableTitle,
  secondTableTitle,
  title,
  buttonAdd,
  datas,
  attributes,
  url
}) => {

  const { colors } = useContext(ThemeContext)

  return (
    <Container>
      <div id='header'>
        <h3 id='title' style={{ color: colors.text }}>{title}</h3>
        <Button variant="success" onClick={buttonAdd}>
          {buttonTitle}
        </Button>
      </div>

      <Tabela striped bordered hover>
        <thead>
          <tr style={{ color: colors.text }}>
            <th>#</th>
            <th>{firstTableTitle}</th>
            <th>{secondTableTitle}</th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{ color: colors.text }}>
          {datas.map((data, index) => {
            return (
              <tr key={index}>{
                attributes.map((att, index2) => {
                  return (
                    <td key={index2}>{data[att]}</td>
                  )
                })
              }
                <a id='editButton'
                  style={{ color: colors.text }}
                  href={`${url}/${data.id}`}
                >
                  <FaPen />
                </a>
              </tr>
            )
          })}
        </tbody>
      </Tabela>
    </Container >
  )
}

Table.propTypes = {
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
  firstTableTitle: PropTypes.string,
  secondTableTitle: PropTypes.string,
  children: PropTypes.element.isRequired,
  buttonAdd: PropTypes.element.isRequired,
  datas: PropTypes.array,
  attributes: PropTypes.array,
  url: propTypes.string
}

export default Table;

import React from 'react';
import { Item } from 'semantic-ui-react';

function List({ title, description, createdAt }) {
  // let date = createdAt.split('T')[0];
  // let date2 = new Date(date);
  // var d_names = [
  //   'Sunday',
  //   'Monday',
  //   'Tuesday',
  //   'Wednesday',
  //   'Thursday',
  //   'Friday',
  //   'Saturday',
  // ];

  // console.log(
  //   d_names[date2.getDay()] +
  //     '-' +
  //     date2.getFullYear() +
  //     '-' +
  //     (date2.getMonth() + 1) +
  //     '-' +
  //     date2.getDate()
  // );
  return (
    <Item>
      <Item.Image
        size="tiny"
        src="https://react.semantic-ui.com/images/wireframe/image.png"
      />
      <Item.Content>
        <Item.Header>{title}</Item.Header>
        <Item.Description>{description}</Item.Description>
        <Item.Extra>{createdAt}</Item.Extra>
      </Item.Content>
    </Item>
  );
}

export default List;

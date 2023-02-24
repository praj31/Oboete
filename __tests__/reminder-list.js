import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {render, screen, fireEvent} from '@testing-library/react-native';

const MyList = () => {
  const [items, setItems] = useState([
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
    {id: 3, name: 'Item 3'},
  ]);

  const renderItem = ({item}) => {
    const handleDelete = () => {
      setItems(prevItems =>
        prevItems.filter(prevItem => prevItem.id !== item.id),
      );
    };

    return (
      <TouchableOpacity onPress={handleDelete}>
        <View style={{padding: 16}}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

// export default MyList;

test('deleting an item removes it from the list', () => {
  render(<MyList />);

  // Check that all items are in the list
  items.forEach(item => {
    expect(screen.getByText(item.name)).toBeDefined();
  });

  // Click the remove button for the second item
  fireEvent.press(screen.getByText('Item 2'));

  // Check that the second item is no longer in the list
  expect(screen.queryByText('Item 2')).toBeNull();

});

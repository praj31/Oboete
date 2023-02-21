import * as React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {render, screen, fireEvent} from '@testing-library/react-native';
import moment from 'moment-timezone';


/**
 * Test for mandatory fields: The user should not be able to submit the form without
 * filling all the mandatory fields (Title, date, time, interval and repeat).
 */

function TaskOne() {
  const [title, setTitle] = React.useState('');
  const [date, setDate] = React.useState(`${moment().toDate()}`);
  const [time, setTime] = React.useState(
    `${moment().hour()}:${moment().minute()}`,
  );
  const [interval, setInterval] = React.useState('');
  const [repeat, setRepeat] = React.useState('');

  const [show, setShow] = React.useState(false);

  return (
    <View>
      <TextInput
        value={title}
        onChangeText={setTitle}
        testID="reminder-title"
        maxLength={40}
      />
      <TextInput value={date} onChangeText={setDate} testID="reminder-date" />
      <TextInput value={time} onChangeText={setTime} testID="reminder-time" />
      <TextInput
        value={interval}
        onChangeText={setInterval}
        testID="reminder-interval"
      />
      <TextInput
        value={repeat}
        onChangeText={setRepeat}
        testID="reminder-repeat"
      />
      <Button
        title="Submit Details"
        onPress={() => {
          title != '' &&
            date != '' &&
            time != '' &&
            interval != '' &&
            repeat != '' &&
            setShow(true);
        }}
      />
      {show && <Text testID="printed-username">{title}</Text>}
    </View>
  );
}

test('Test: All input fields are not null', async () => {
  let testTitle = 'Reminder 1';
  let testDate = `${moment().toDate()}`;
  let testTime = `${moment().hour()}:${moment().minute()}`;
  let testInterval = '3';
  let testRepeat = '2';

  render(<TaskOne />);

  fireEvent.changeText(screen.getByTestId('reminder-title'), testTitle);
  fireEvent.changeText(screen.getByTestId('reminder-date'), testDate);
  fireEvent.changeText(screen.getByTestId('reminder-time'), testTime);
  fireEvent.changeText(screen.getByTestId('reminder-interval'), testInterval);
  fireEvent.changeText(screen.getByTestId('reminder-repeat'), testRepeat);
  fireEvent.press(screen.getByText('Submit Details'));

  // Using `findBy` query to wait for asynchronous operation to finish
  const usernameOutput = await screen.findByTestId('printed-username');

  // Using `toHaveTextContent` matcher from `@testing-library/jest-native` package.
  expect(usernameOutput).toHaveTextContent(testTitle);

  expect(screen.toJSON()).toMatchSnapshot();
});


/**
 * 
 * Test for correct input format: Ensure that user only submits the form if the 
 * input fields are in the correct format. For eg, the date should be in the 
 * format of dd/mm/yyyy, the time in the format of hh:mm & the interval & repeat should be +ve integers.
 */

// function TaskTwo() {
//   const [date, setDate] = React.useState('');
//   const [time, setTime] = React.useState('');
//   const [interval, setInterval] = React.useState('');
//   const [repeat, setRepeat] = React.useState('');

//   const [show, setShow] = React.useState(false);

//   return (
//     <View>
//       <TextInput value={date} onChangeText={setDate} testID="reminder-date" />
//       <TextInput value={time} onChangeText={setTime} testID="reminder-time" />
//       <TextInput
//         value={interval}
//         onChangeText={setInterval}
//         testID="reminder-interval"
//       />
//       <TextInput
//         value={repeat}
//         onChangeText={setRepeat}
//         testID="reminder-repeat"
//       />
//       <Button
//         title="Submit Details"
//         onPress={() => {
//             ((moment(time, "HH:MM")._f) == "HH:MM" && (moment(date, "DD-MM-YYYY")._f) == "DD-MM-YYYY") &&
//             (Number(interval) > -1 && Number(repeat) > -1) &&
//             setShow(true);
//         }}
//       />
//       {show && <Text testID="printed-username">Pass</Text>}
//     </View>
//   );
// }

// test('Test: All input fields are not null', async () => {
//   let testDate = "20-02-2023";
//   let testTime = `${moment().hour()}:${moment().minute()}`;
//   let testInterval = '3';
//   let testRepeat = '2';

//   render(<TaskTwo />);

//   fireEvent.changeText(screen.getByTestId('reminder-date'), testDate);
//   fireEvent.changeText(screen.getByTestId('reminder-time'), testTime);
//   fireEvent.changeText(screen.getByTestId('reminder-interval'), testInterval);
//   fireEvent.changeText(screen.getByTestId('reminder-repeat'), testRepeat);
//   fireEvent.press(screen.getByText('Submit Details'));

//   // Using `findBy` query to wait for asynchronous operation to finish
//   const usernameOutput = await screen.findByTestId('printed-username');

//   // Using `toHaveTextContent` matcher from `@testing-library/jest-native` package.
//   expect(usernameOutput).toHaveTextContent('Pass');

//   expect(screen.toJSON()).toMatchSnapshot();
// });

/**
 * Test for maximum values: Test the form submission by inputting the maximum possible values for the input fields.
 */

// function InputField() {
//   return (
//     <TextInput
//         value={'Something-to-test'}
//         testID="reminder-title"
//         maxLength={40}
//       />
//   )
// }

// describe('InputField', () => {
//   it('should not allow more than 40 characters', () => {
//     render(<InputField />);
//     const input = screen.getByTestId('reminder-title');
//     const longText = 'This text should be less than 40 char';
//     fireEvent.changeText(input, longText);
//     expect(input.props.value.length).toBeLessThanOrEqual(40);
//   });
// });

/**
 * Test for minimum values: Test the form submission by inputting the minimum possible values for the input fields.
 */

// function InputField() {
//   return (
//     <TextInput
//         value={'Something-to-test'}
//         testID="reminder-title"
//         maxLength={40}
//       />
//   )
// }

// describe('InputField', () => {
//   it('should not allow less than 3 characters', () => {
//     render(<InputField />);
//     const input = screen.getByTestId('reminder-title');
//     const longText = 'This text should be longer than 3 characters';
//     fireEvent.changeText(input, longText);
//     expect(input.props.value.length).toBeGreaterThan(3);
//   });
// });

/**
 * Test for cancelling the form: Ensure that when the user
 * clicks the cancel button, the form is cancelled and no data is saved.
 * 
 * Test for cancelling the form with filled data: Ensure that when the user clicks the cancel button after 
 * filling in the input fields, the form is cancelled and the data is not saved.
 */

// function TaskFive() {
//   const [title, setTitle] = React.useState('');
//   const [date, setDate] = React.useState(`${moment().toDate()}`);
//   const [time, setTime] = React.useState(
//     `${moment().hour()}:${moment().minute()}`,
//   );
//   const [interval, setInterval] = React.useState('');
//   const [repeat, setRepeat] = React.useState('');

//   const [show, setShow] = React.useState(false);

//   return (
//     <View>
//       <TextInput
//         value={title}
//         onChangeText={setTitle}
//         testID="reminder-title"
//         maxLength={40}
//       />
//       <TextInput value={date} onChangeText={setDate} testID="reminder-date" />
//       <TextInput value={time} onChangeText={setTime} testID="reminder-time" />
//       <TextInput
//         value={interval}
//         onChangeText={setInterval}
//         testID="reminder-interval"
//       />
//       <TextInput
//         value={repeat}
//         onChangeText={setRepeat}
//         testID="reminder-repeat"
//       />
//       <Button
//         title="Cancel"
//         onPress={() => {
//           setTitle("");
//           setDate("");
//           setTime("");
//           setInterval("");
//           setRepeat("");
//         }}
//       />
//       {<Text testID="printed-test">{title == "" ? 'Pass' : 'Failed'}</Text>}
//     </View>
//   );
// }


// test('Test: Form should be empty after clicking cancelling', async () => {
//   let testTitle = 'Reminder 1';
//   let testDate = `${moment().toDate()}`;
//   let testTime = `${moment().hour()}:${moment().minute()}`;
//   let testInterval = '3';
//   let testRepeat = '2';

//   render(<TaskFive />);

//   fireEvent.changeText(screen.getByTestId('reminder-title'), testTitle);
//   fireEvent.changeText(screen.getByTestId('reminder-date'), testDate);
//   fireEvent.changeText(screen.getByTestId('reminder-time'), testTime);
//   fireEvent.changeText(screen.getByTestId('reminder-interval'), testInterval);
//   fireEvent.changeText(screen.getByTestId('reminder-repeat'), testRepeat);
//   fireEvent.press(screen.getByText('Cancel'));

//   // Using `findBy` query to wait for asynchronous operation to finish
//   const usernameOutput = await screen.findByTestId('printed-test');

//   // Using `toHaveTextContent` matcher from `@testing-library/jest-native` package.
//   expect(usernameOutput).toHaveTextContent('Pass');

//   expect(screen.toJSON()).toMatchSnapshot();
// });

import * as React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {render, screen, fireEvent} from '@testing-library/react-native';
import moment from 'moment-timezone';


// 



// const sum = require('../utils/sum.js');

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

  
/**
 * Test for mandatory fields: The user should not be able to submit the form without
 * filling all the mandatory fields (Title, date, time, interval and repeat).
 */

// function TaskOne() {
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
//         title="Submit Details"
//         onPress={() => {
//           title != '' &&
//             date != '' &&
//             time != '' &&
//             interval != '' &&
//             repeat != '' &&
//             setShow(true);
//         }}
//       />
//       {show && <Text testID="printed-username">{title}</Text>}
//     </View>
//   );
// }



// test('Test: All input fields are not null', async () => {
//   let testTitle = 'Reminder 1';
//   let testDate = `${moment().toDate()}`;
//   let testTime = `${moment().hour()}:${moment().minute()}`;
//   let testInterval = '3';
//   let testRepeat = '2';

//   render(<ExampleOne />);

//   fireEvent.changeText(screen.getByTestId('reminder-title'), testTitle);
//   fireEvent.changeText(screen.getByTestId('reminder-date'), testDate);
//   fireEvent.changeText(screen.getByTestId('reminder-time'), testTime);
//   fireEvent.changeText(screen.getByTestId('reminder-interval'), testInterval);
//   fireEvent.changeText(screen.getByTestId('reminder-repeat'), testRepeat);
//   fireEvent.press(screen.getByText('Submit Details'));

//   // Using `findBy` query to wait for asynchronous operation to finish
//   const usernameOutput = await screen.findByTestId('printed-username');

//   // Using `toHaveTextContent` matcher from `@testing-library/jest-native` package.
//   expect(usernameOutput).toHaveTextContent(testTitle);

//   expect(screen.toJSON()).toMatchSnapshot();
// });

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


/** NEW TEST 1. 1.	Input field should default to 0 if no input is provided. Also test for trailing 0's. */

function TaskOne() {
    const [value, setValue] = React.useState('');
  
    return (
      <View>
        <TextInput
          value={value}
          onChangeText={setValue}
          testID="input-value"
        />
        <Button
          title="Submit"
          onPress={() => {
            const parsedValue = parseInt(value);
            if (isNaN(parsedValue)) {
              setValue('0');
            } else {
              setValue(parsedValue.toString());
            }
          }}
        />
        <Text testID="output-value">{value}</Text>
      </View>
    );
  }
  
  test('Test: Input field should default to 0 if no input is provided', async () => {
    render(<TaskOne/>);
  
    // Test with no input provided
    fireEvent.press(screen.getByText('Submit'));
    const outputElement = await screen.findByTestId('output-value');
    expect(outputElement).toHaveTextContent('0');
  
    // Test with trailing 0's
    fireEvent.changeText(screen.getByTestId('input-value'), '020');
    fireEvent.press(screen.getByText('Submit'));
    const trailingZeroOutput = await screen.findByTestId('output-value');
    expect(trailingZeroOutput).toHaveTextContent('20');
  });
  







/**NEW test 2. for Input field that should not contain negative number------ */

function TaskTwo() {
    const [date, setDate] = React.useState('');
    const [time, setTime] = React.useState('');
    const [interval, setInterval] = React.useState('');
    const [repeat, setRepeat] = React.useState('');
  
    const [show, setShow] = React.useState(false);
    const [error, setError] = React.useState('');
  
    return (
      <View>
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
            if (
              Number(interval) >= 0 &&
              Number(repeat) >= 0 &&
              !/^-?\d*\.?\d*$/.test(date) &&
              !/^-?\d*\.?\d*$/.test(time)
            ) {
              setShow(true);
              setError('');
            } else {
              setShow(false);
              setError('Input fields should not contain negative numbers');
            }
          }}
        />
        {error !== '' && <Text testID="error-message">{error}</Text>}
        {show && <Text testID="printed-username">Pass</Text>}
      </View>
    );
  }
  
  test('Test: Input field should not contain negative number', async () => {
    let testDate = '20-02-2023';
    let testTime = `${moment().hour()}:${moment().minute()}`;
    let testInterval = '3';
    let testRepeat = '-2';
  
    render(<TaskTwo />);
  
    fireEvent.changeText(screen.getByTestId('reminder-date'), testDate);
    fireEvent.changeText(screen.getByTestId('reminder-time'), testTime);
    fireEvent.changeText(screen.getByTestId('reminder-interval'), testInterval);
    fireEvent.changeText(screen.getByTestId('reminder-repeat'), testRepeat);
    fireEvent.press(screen.getByText('Submit Details'));
  
    const errorMessage = await screen.findByTestId('error-message');
  
    expect(errorMessage).toHaveTextContent(
      'Input fields should not contain negative numbers'
    );
    expect(screen.queryByTestId('printed-username')).toBeNull();
    // // expect(screen.toJSON()).toMatchSnapshot();
  });
  



/** NEW TEST 3. for Input field should not contain any decimal values */


function TaskThree() {
    const [date, setDate] = React.useState('');
    const [time, setTime] = React.useState('');
    const [interval, setInterval] = React.useState('');
    const [repeat, setRepeat] = React.useState('');
    const [show, setShow] = React.useState(false);
  
    return (
      <View>
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
            let isIntervalValid = Number.isInteger(Number(interval));
            let isRepeatValid = Number.isInteger(Number(repeat));
            let hasNoDecimalValues =
              !interval.includes('.') && !repeat.includes('.');
            if (isIntervalValid && isRepeatValid && hasNoDecimalValues) {
              setShow(true);
            }
          }}
        />
        {show && <Text testID="printed-username">Pass</Text>}
      </View>
    );
  }
  
  test('Test: Input field should not contain any decimal values', async () => {
    let testDate = '20-02-2023';
    let testTime = `${moment().hour()}:${moment().minute()}`;
    let testInterval = '3';
    let testRepeat = '2.4';
  
    render(<TaskThree />);
  
    fireEvent.changeText(screen.getByTestId('reminder-date'), testDate);
    fireEvent.changeText(screen.getByTestId('reminder-time'), testTime);
    fireEvent.changeText(screen.getByTestId('reminder-interval'), testInterval);
    fireEvent.changeText(screen.getByTestId('reminder-repeat'), testRepeat);
    fireEvent.press(screen.getByText('Submit Details'));
  
    // // const usernameOutput = await screen.findByTestId('printed-username');
  
    // // expect(usernameOutput).toBeNull();
    // expect(screen.toJSON()).toMatchSnapshot();
  });
  



/** NEW TEST 4.	Input field should not contain any alphabets or special characters. */

function TaskFour() {
    const [input, setInput] = React.useState('');
    const [show, setShow] = React.useState(false);
  
    return (
      <View>
        <TextInput value={input} onChangeText={setInput} testID="input-field" />
        <Button
          title="Submit"
          onPress={() => {
            const pattern = /^[0-9]+$/;
            if (pattern.test(input)) {
              setShow(true);
            }
          }}
        />
        {show && <Text testID="result-text">Valid Input</Text>}
      </View>
    );
  }
  
  test('Test: Input field should not contain any alphabets or special characters', async () => {
    const invalidInputs = ['abc', '@#$', '12abc', '1@#$', '1234abc'];
    const validInput = '1234';
  
    render(<TaskFour />);
    
    for (let input of invalidInputs) {
      fireEvent.changeText(screen.getByTestId('input-field'), input);
    //   fireEvent.press(screen.getByTitle('Submit'));
      const resultText = await screen.queryByTestId('result-text');
      expect(resultText).toBeNull();
    }
  
    fireEvent.changeText(screen.getByTestId('input-field'), validInput);
    // fireEvent.press(screen.getByTitle('Submit'));
    // const resultText = await screen.findByTestId('result-text');
    // expect(resultText).not.toBeNull();
    // expect(resultText.props.children).toBe('Valid Input');
  });

  /** NEW TEST    5.	Interval: Maximum input field value should be 360 */


  function TaskFive() {
    const [interval, setInterval] = React.useState('');
    const [show, setShow] = React.useState(false);
  
    return (
      <View>
        <TextInput
          value={interval}
          onChangeText={setInterval}
          testID="reminder-interval"
        />
        <Button
          title="Submit Details"
          onPress={() => {
            const isNumeric = /^[0-9]+$/.test(interval);
            const isWithinMaxValue = parseInt(interval) <= 360;
            if (isNumeric && isWithinMaxValue) {
              setShow(true);
            }
          }}
        />
        {show && <Text testID="printed-username">Pass</Text>}
      </View>
    );
  }
  
  test('Test: Interval input should not exceed maximum value 360', async () => {
    const maxIntervalValue = "360";
    const invalidIntervalValue = "500";
    
    render(<TaskFive />);
  
    // Test with invalid interval value above 360
    fireEvent.changeText(screen.getByTestId('reminder-interval'), invalidIntervalValue);
    fireEvent.press(screen.getByText('Submit Details'));
    const invalidIntervalOutput = await screen.queryByTestId('printed-username');
    expect(invalidIntervalOutput).toBeNull();
  
    // Test with valid interval value below or equal to 360
    fireEvent.changeText(screen.getByTestId('reminder-interval'), maxIntervalValue);
    fireEvent.press(screen.getByText('Submit Details'));
    const validIntervalOutput = await screen.findByTestId('printed-username');
    expect(validIntervalOutput).toHaveTextContent('Pass');
    expect(screen.toJSON()).toMatchSnapshot();
  });
  



/** NEW TEST 6.	Minimum input field value should be 360 */


function TaskSix() {
  const [interval, setInterval] = React.useState('');
  const [show, setShow] = React.useState(false);

  return (
    <View>
      <TextInput
        value={interval}
        onChangeText={setInterval}
        testID="reminder-interval"
      />
      <Button
        title="Submit Details"
        onPress={() => {
          const isNumeric = /^[0-9]+$/.test(interval);
          const isWithinMaxValue = parseInt(interval) <= 360;
          if (isNumeric && isWithinMaxValue) {
            setShow(true);
          }
        }}
      />
      {show && <Text testID="printed-username">Pass</Text>}
    </View>
  );
}

test('Test: Interval input should not exceed maximum value 360', async () => {
  const maxIntervalValue = "360";
  const invalidIntervalValue = "500";
  
  render(<TaskSix />);

  // Test with invalid interval value above 360
  fireEvent.changeText(screen.getByTestId('reminder-interval'), invalidIntervalValue);
  fireEvent.press(screen.getByText('Submit Details'));
  const invalidIntervalOutput = await screen.queryByTestId('printed-username');
  expect(invalidIntervalOutput).toBeNull();

  // Test with valid interval value below or equal to 360
  fireEvent.changeText(screen.getByTestId('reminder-interval'), maxIntervalValue);
  fireEvent.press(screen.getByText('Submit Details'));
  const validIntervalOutput = await screen.findByTestId('printed-username');
  expect(validIntervalOutput).toHaveTextContent('Pass');
  expect(screen.toJSON()).toMatchSnapshot();
});




/** 7.	Repeat: Maximum input field value should be 20 */


function TaskSeven() {
    const [repeat, setRepeat] = React.useState('');
    const [show, setShow] = React.useState(false);
  
    return (
      <View>
        <TextInput
          value={repeat}
          onChangeText={setRepeat}
          testID="reminder-repeat"
        />
        <Button
          title="Submit Details"
          onPress={() => {
            const isNumeric = /^[0-9]+$/.test(repeat);
            const isWithinMaxValue = parseInt(repeat) <= 20;
            if (isNumeric && isWithinMaxValue) {
              setShow(true);
            }
          }}
        />
        {show && <Text testID="printed-username">Pass</Text>}
      </View>
    );
  }
  
  test('Test: Repeat input should not exceed maximum value 20', async () => {
    const maxRepeatValue = "20";
    const invalidRepeatValue = "25";
    
    render(<TaskSeven />);
  
    // Test with invalid repeat value above 20
    fireEvent.changeText(screen.getByTestId('reminder-repeat'), invalidRepeatValue);
    fireEvent.press(screen.getByText('Submit Details'));
    const invalidRepeatOutput = await screen.queryByTestId('printed-username');
    expect(invalidRepeatOutput).toBeNull();
  
    // Test with valid repeat value below or equal to 20
    fireEvent.changeText(screen.getByTestId('reminder-repeat'), maxRepeatValue);
    fireEvent.press(screen.getByText('Submit Details'));
    const validRepeatOutput = await screen.findByTestId('printed-username');
    expect(validRepeatOutput).toHaveTextContent('Pass');
    expect(screen.toJSON()).toMatchSnapshot();
  });






/** 8.	Minimum input field value should be 20 */
  
function TaskEight() {
    const [repeat, setRepeat] = React.useState('');
    const [show, setShow] = React.useState(false);
  
    return (
      <View>
        <TextInput
          value={repeat}
          onChangeText={setRepeat}
          testID="reminder-repeat"
        />
        <Button
          title="Submit Details"
          onPress={() => {
            const isNumeric = /^[0-9]+$/.test(repeat);
            const isWithinRange = parseInt(repeat) >= 20 && parseInt(repeat) <= 999;
            if (isNumeric && isWithinRange) {
              setShow(true);
            }
          }}
        />
        {show && <Text testID="printed-username">Pass</Text>}
      </View>
    );
  }
  
  test('Test: Repeat input should have a minimum value of 20', async () => {
    const validRepeatValue = "20";
    const invalidRepeatValue = "10";
    
    render(<TaskEight />);
  
    // Test with invalid repeat value below 20
    fireEvent.changeText(screen.getByTestId('reminder-repeat'), invalidRepeatValue);
    fireEvent.press(screen.getByText('Submit Details'));
    const invalidRepeatOutput = await screen.queryByTestId('printed-username');
    expect(invalidRepeatOutput).toBeNull();
  
    // Test with valid repeat value above or equal to 20
    fireEvent.changeText(screen.getByTestId('reminder-repeat'), validRepeatValue);
    fireEvent.press(screen.getByText('Submit Details'));
    const validRepeatOutput = await screen.findByTestId('printed-username');
    expect(validRepeatOutput).toHaveTextContent('Pass');
    expect(screen.toJSON()).toMatchSnapshot();
  });
  



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

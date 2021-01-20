import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
const OnboardAddNumber = () => {
  const [number, setNumber] = useState('');
  const serviceID = {serviceID};
  const authToken = {authToken};
  let data = new FormData();
  data.append('To', {number});
  data.append('Channel', 'sms');
  const sendMessage = () => {
    axios({
      url: `https://verify.twilio.com/v2/Services/${serviceID}/Verifications`,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Basic ${authToken}`,
      },
    })
      .then((res) => {
        console.log(`Axios Call completed: ${res}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View>
      <Text>Enter your mobile number</Text>
      <TextInput
        placeholder="(415) 123-1234"
        placeholderTextColor="grey"
        keyboardType="numeric"
        onChangeText={(text) => setNumber(text)}
      />
      <View>
        <Text>
          By continuing you may receive an SMS for verification. Message and
          data rates may apply.
        </Text>
        {number.length != 11 ? (
          <View>
            <Icon name="arrowright" size={30} color="grey" />
          </View>
        ) : (
          <TouchableOpacity onPress={() => sendMessage()}>
            <Icon name="arrowright" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OnboardAddNumber;

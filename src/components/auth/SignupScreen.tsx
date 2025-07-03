import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import tailwind from '../../styles/tailwind';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../services/firebase';
import Loading from '../common/Loading';
import Error from '../common/Error';

const SignupScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[tailwind.flex1, tailwind.justifyCenter, tailwind.p8]}>
      <Text style={[tailwind.text2xl, tailwind.fontBold, tailwind.mB4]}>
        Sign Up
      </Text>
      <TextInput
        style={[tailwind.border, tailwind.p2, tailwind.mB2, tailwind.rounded]}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[tailwind.border, tailwind.p2, tailwind.mB4, tailwind.rounded]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Error message={error} />}
      {loading ? (
        <Loading />
      ) : (
        <Button title="Sign Up" onPress={handleSignup} />
      )}
      <Text style={[tailwind.mT4]}>
        Already have an account?{' '}
        <Text
          style={tailwind.textBlue600}
          onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </Text>
    </View>
  );
};

export default SignupScreen;

import React from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {useHabitsContext} from '../contexts/HabitsContext';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import tailwind from '../styles/tailwind';

const DashboardScreen = ({navigation}: any) => {
  const {habits, loading, error} = useHabitsContext();

  return (
    <View style={[tailwind.flex1, tailwind.p4]}>
      <Text style={[tailwind.text2xl, tailwind.fontBold, tailwind.mB4]}>
        My Habits
      </Text>
      {loading && <Loading />}
      {error && <Error message={error} />}
      <FlatList
        data={habits}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View
            style={[
              tailwind.p2,
              tailwind.mB2,
              tailwind.bgGray100,
              tailwind.rounded,
            ]}>
            <Text style={tailwind.textLg}>{item.name}</Text>
            <Text>Frequency: {item.frequency}</Text>
            <Text>
              Status: {item.completionStatus ? 'Completed' : 'Incomplete'}
            </Text>
            <Button
              title="Edit"
              onPress={() => navigation.navigate('AddEditHabit', {habit: item})}
            />
          </View>
        )}
        ListEmptyComponent={<Text>No habits yet. Add one!</Text>}
      />
      <Button
        title="Add Habit"
        onPress={() => navigation.navigate('AddEditHabit')}
      />
    </View>
  );
};

export default DashboardScreen;

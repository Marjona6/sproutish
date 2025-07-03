import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {useHabitsContext} from '../contexts/HabitsContext';
import tailwind from '../styles/tailwind';

const AddEditHabitScreen = ({route, navigation}: any) => {
  const {habit} = route.params || {};
  const isEdit = !!habit;
  const [name, setName] = useState(habit?.name || '');
  const [frequency, setFrequency] = useState(habit?.frequency || '');
  const {addHabit, updateHabit} = useHabitsContext();

  const handleSave = async () => {
    if (isEdit) {
      await updateHabit(habit.id, {name, frequency});
    } else {
      await addHabit({
        name,
        frequency,
        completionStatus: false,
        userId: habit?.userId || '',
      });
    }
    navigation.goBack();
  };

  return (
    <View style={[tailwind.flex1, tailwind.justifyCenter, tailwind.p8]}>
      <Text style={[tailwind.text2xl, tailwind.fontBold, tailwind.mB4]}>
        {isEdit ? 'Edit Habit' : 'Add Habit'}
      </Text>
      <TextInput
        style={[tailwind.border, tailwind.p2, tailwind.mB2, tailwind.rounded]}
        placeholder="Habit Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[tailwind.border, tailwind.p2, tailwind.mB4, tailwind.rounded]}
        placeholder="Frequency (e.g. Daily, Weekly)"
        value={frequency}
        onChangeText={setFrequency}
      />
      <Button title={isEdit ? 'Update' : 'Add'} onPress={handleSave} />
    </View>
  );
};

export default AddEditHabitScreen;

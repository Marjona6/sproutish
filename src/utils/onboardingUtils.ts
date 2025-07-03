import AsyncStorage from '@react-native-async-storage/async-storage';

export const resetOnboarding = async () => {
  try {
    await AsyncStorage.multiRemove([
      'onboardingComplete',
      'categoriesSelected',
      'selectedCategories',
    ]);
    console.log('Onboarding reset successfully');
  } catch (error) {
    console.error('Error resetting onboarding:', error);
  }
};

export const getOnboardingStatus = async () => {
  try {
    const [onboardingComplete, categoriesSelected, selectedCategories] =
      await Promise.all([
        AsyncStorage.getItem('onboardingComplete'),
        AsyncStorage.getItem('categoriesSelected'),
        AsyncStorage.getItem('selectedCategories'),
      ]);

    return {
      onboardingComplete: !!onboardingComplete,
      categoriesSelected: !!categoriesSelected,
      selectedCategories: selectedCategories
        ? JSON.parse(selectedCategories)
        : [],
    };
  } catch (error) {
    console.error('Error getting onboarding status:', error);
    return {
      onboardingComplete: false,
      categoriesSelected: false,
      selectedCategories: [],
    };
  }
};

export const setOnboardingComplete = async () => {
  try {
    await AsyncStorage.setItem('onboardingComplete', 'true');
    console.log('Onboarding marked as complete');
  } catch (error) {
    console.error('Error setting onboarding complete:', error);
  }
};

export const setCategoriesSelected = async (categories: string[]) => {
  try {
    await AsyncStorage.setItem('categoriesSelected', 'true');
    await AsyncStorage.setItem(
      'selectedCategories',
      JSON.stringify(categories),
    );
    console.log('Categories saved:', categories);
  } catch (error) {
    console.error('Error saving categories:', error);
  }
};

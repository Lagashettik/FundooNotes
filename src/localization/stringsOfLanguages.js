import LocalizedStrings from 'react-native-localization'
import StringsOfEnglish from './languagesStrings/stringsOfEnglish'
import StringsOfHindi from './languagesStrings/stringsOfHindi'
import StringsOfMarathi from './languagesStrings/stringsOfMarathi'

const StringsOfLanguages = new LocalizedStrings({
    en : StringsOfEnglish,
    hi : StringsOfHindi,
    ma : StringsOfMarathi
});

export default StringsOfLanguages;
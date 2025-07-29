import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import CountryPicker from 'react-native-country-picker-modal';
const FlagIcon = ({ code }) => {
    const flagEmoji = {
        AUD: '🇦🇺',
        MYR: '🇲🇾',
    };
    return <Text style={{ fontSize: 18 }}>{flagEmoji[code]}</Text>;
};

export default function DualCurrencyInvestment() {
    const route = useRoute()
    const navigation = useNavigation()
    const [currency, setCurrency] = useState(route?.params?.country ? route?.params?.country : "USD-INR");
    const [period, setPeriod] = useState(route?.params?.period ? route?.params?.period : "2W");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const currencies = [
        { label: "AUD-HYR", value: "AUD-HYR" },
        { label: "USD-INR", value: "USD-INR" },
        { label: "EUR-USD", value: "EUR-USD" },
        { label: "GBP-JPY", value: "GBP-JPY" },
    ];
    const periods = [{ label: '1W', value: '1W' }, { label: '2W', value: '2W' }, { label: '1M', value: '1M' }];
    const [countryCode, setCountryCode] = useState('AU');
    const [investmentAmount, setInvestmentAmount] = useState("100,000.0000"); // Default value
    const [tradeDate, setTradeDate] = useState("10-jul-2024");
    const [startDate, setStartDate] = useState("12-jul-2024");
    const [expiryDate, setExpiryDate] = useState(route?.params?.expiryDate);
    const [maturityDate, setMaturityDate] = useState(route?.params?.maturityDate);
    const [spotRateRef, setSpotRateRef] = useState(route?.params?.targetRate);
    const [executionSpotRate, setExecutionSpotRate] = useState(route?.params?.targetRate);
    const [targetConversionRate, setTargetConversionRate] = useState(route?.params?.targetRate);
    const [calculatedOptionPremium, setCalculatedOptionPremium] = useState("0.00");
    const [totalEnhancedRate, setTotalEnhancedRate] = useState(route?.params?.enhancedRate.replace('%', '').trim());
    const [salesMargin, setSalesMargin] = useState("0.00");
    const [totalClientEnhancedRate, setTotalClientEnhancedRate] = useState(route?.params?.enhancedRate.replace('%', '').trim());
    const onSelect = (selectedCountry) => {
        setCountryCode(selectedCountry.cca2);
    };
    const fields = [
        { label: "Investment Amount", value: investmentAmount, setValue: setInvestmentAmount, placeholder: "Investment Amount", keyboardType: "numeric" },
        { label: "Trade Date", value: tradeDate, setValue: setTradeDate, placeholder: "Trade Date" },
        { label: "Start Date", value: startDate, setValue: setStartDate, placeholder: "Start Date" },
        { label: "Expiry Date", value: expiryDate, setValue: setExpiryDate, placeholder: "Expiry Date" },
        { label: "Maturity Date", value: maturityDate, setValue: setMaturityDate, placeholder: "Maturity Date" },
        { label: "Spot Rate Reference", value: spotRateRef, setValue: setSpotRateRef, placeholder: "Spot Rate Reference" },
        { label: "Execution Spot Rate", value: executionSpotRate, setValue: setExecutionSpotRate, placeholder: "Execution Spot Rate" },
        { label: "Target Conversion Rate", value: targetConversionRate, setValue: setTargetConversionRate, placeholder: "Target Conversion Rate" },
        { label: "Calculated Option Premium", value: calculatedOptionPremium, setValue: setCalculatedOptionPremium, placeholder: "Calculated Option Premium" },
        { label: "Executed Option Premium", value: calculatedOptionPremium, setValue: setCalculatedOptionPremium, placeholder: "Executed Option Premium" },
        { label: "Total Enhanced Rate %", value: totalEnhancedRate, setValue: setTotalEnhancedRate, placeholder: "Total Enhanced Rate %" },
        { label: "Sales Margin in %", value: salesMargin, setValue: setSalesMargin, placeholder: "Sales Margin in %" },
        { label: "Client Enhanced Rate %", value: totalClientEnhancedRate, setValue: setTotalClientEnhancedRate, placeholder: "Client Enhanced Rate %" },
    ];
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ backgroundColor: '#1f4d82', height: 110 }}>
                <StatusBar translucent={true} barStyle={"light-content"} />
                <View style={{ height: 50, backgroundColor: '#1f4d82', flexDirection: 'row' }}>
                    <Icon name="arrow-back" type="ionicon" color={'white'} size={26} containerStyle={{ paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => { navigation.goBack() }} />
                    <Text style={{ fontWeight: "bold", fontSize: 22, color: 'white', textAlignVertical: 'center' }}>Dual Currency Investment</Text>
                </View>
            </SafeAreaView>
            <View style={styles.barDesign}>
                <Text style={styles.label}>
                    STATUS: <Text style={styles.value}>NEW_DEAL</Text>
                </Text>
                <Text style={styles.label}>
                    OFFERING: <Text style={styles.value}>-1</Text>
                </Text>
                <Text style={styles.label}>
                    VERSION: <Text style={styles.value}>-1</Text>
                </Text>
                <Text style={styles.label}>
                    TIMER: <Text style={styles.value}>--</Text>
                </Text>
            </View>

            <View style={styles.search}>
                <View style={styles.row}>
                    <Text style={styles.client}>
                        Client Search: <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput style={styles.inputSearch} />
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellLabel}>CIF</Text>
                        <TextInput style={styles.inputSearch1} />

                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellLabel}>Name</Text>
                        <TextInput style={styles.inputSearch1} />

                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellLabel}>Client ID Type,ID</Text>
                        <TextInput style={styles.inputSearch1} />

                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellLabel}>Residence</Text>
                        <TextInput style={styles.inputSearch1} />

                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled style={styles.container}>
                <Text style={{ color: '#1f4d82', fontSize: 15, fontWeight: "bold" }}>Results</Text>

                <View style={styles.result1}>
                    {/* Header */}
                    <View style={styles.headerRow}>
                        <Text style={styles.headerLabel}>YIELD TO QUOTE p.a %</Text>
                        <Text style={styles.headerValue}>{route?.params?.enhancedRate}</Text>
                    </View>
                    <View style={styles.divider} />

                    {/* Rows */}
                    <View style={styles.row}>
                        <Text style={styles.label}>
                            <Text style={styles.italic}>AUD</Text> Notional Return if not Exercised </Text>
                        <Text style={styles.value}>100,515.89</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>
                            <Text style={styles.italic}>MYR</Text> Notional Return if Exercised </Text>
                        <Text style={styles.value}>403,300.00</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>
                            <Text style={styles.italic}>AUD</Text> Accrued Interest Due at Expiry </Text>
                        <Text style={styles.value}>515.89</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>
                            Net Revenue <FlagIcon code="AUD" /> <Text style={styles.italic}>AUD </Text>
                        </Text>
                        <Text style={styles.value}>0.0000</Text>
                    </View>
                </View>
                {/* Investment Details */}
                <View style={styles.card}>
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: "bold" }}>Investment Currency</Text>
                    <CountryPicker
                        countryCode={countryCode}
                        withFilter
                        withFlag
                        withCountryNameButton
                        onSelect={onSelect}
                    />

                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: "bold" }}>Underlying</Text>
                        <DropDownPicker
                            listMode="SCROLLVIEW"
                            open={dropdownOpen}
                            value={currency}
                            items={currencies}
                            setOpen={setDropdownOpen}
                            setValue={setCurrency}
                            placeholder="Select Currency"
                            style={styles.dropdown}
                        />
                    </View>
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: "bold", paddingVertical: 10 }}>Investment Period</Text>
                    <DropDownPicker
                        listMode="SCROLLVIEW"
                        open={dropdownOpen1}
                        value={period}
                        items={periods}
                        setOpen={setDropdownOpen1}
                        setValue={setPeriod}
                        placeholder="Investment Period"
                        style={styles.dropdown}
                    />
                    {
                        fields?.map((name, index) => {
                            return (
                                <View key={index} style={{ flex: 1 }}>
                                    <Text style={{ color: 'black', fontSize: 15, fontWeight: "bold", paddingVertical: 10 }}>{name?.label}</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={name?.placeholder}
                                        value={name?.value}
                                        onChangeText={name?.setValue}
                                        keyboardType={name?.keyboardType || "default"}
                                    />
                                </View>
                            )
                        })
                    }
                </View>
                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>QUOTE</Text></TouchableOpacity>
                    <TouchableOpacity disabled={true} style={styles.button1}><Text style={styles.buttonText}>SENSITIVITY</Text></TouchableOpacity>
                    <TouchableOpacity disabled={true} style={styles.button2}><Text style={styles.buttonText}>MATRIX</Text></TouchableOpacity>
                    <TouchableOpacity disabled={true} style={styles.button2}><Text style={styles.buttonText}>DCI Calc</Text></TouchableOpacity>
                </View>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    result1: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#1f4d82',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 10
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 8,
    },
    headerLabel: {
        fontWeight: 'bold',
        color: '#1f4d82',
        fontSize: 15,
    },
    headerValue: {
        fontSize: 18,
        color: '#298d09',
        fontWeight: 'bold',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#d5eac6',
        marginVertical: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    label: {
        flex: 1.4,
        fontSize: 14,
        color: '#333',
    },
    value: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'right',
        color: '#1f4d82',
    },
    italic: {
        fontStyle: 'italic',
        color: '#4d7733',
    },
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f4f6f8'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        marginTop: 10,
        zIndex: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20
    },
    button: {
        backgroundColor: '#1E3A8A',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 5
    },
    button1: {
        backgroundColor: 'grey',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 5
    },
    button2: {
        backgroundColor: 'grey',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 5
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 10
    },
    barDesign: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: '#e6eef9', // light bluish background
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    label: {
        fontSize: 12,
        color: '#555',
        fontWeight: 'bold',
    },
    value: {
        color: '#000',
        fontWeight: 'bold',
    },

    search: {
        padding: 16,
        backgroundColor: 'white'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    client: {
        marginRight: 6,
        fontWeight: 'bold',
        fontSize: 16,
    },
    required: {
        color: 'red',
    },
    inputSearch: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 4,
        padding: 6,
        flex: 1,
        minWidth: 120,
    },
    inputSearch1: {

        padding: 6,
        flex: 1,
        minWidth: 120,
    },
    table: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 4,
        overflow: 'hidden',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        height: 36,
        alignItems: 'center',
    },
    tableCellLabel: {
        flex: 1,
        paddingHorizontal: 8,
        fontWeight: '600',
        color: '#333',
        borderRightWidth: 1,
        borderRightColor: '#cccccc',
    },
    tableCell: {
        flex: 2,
        paddingHorizontal: 8,
        height: '100%',
    },
});

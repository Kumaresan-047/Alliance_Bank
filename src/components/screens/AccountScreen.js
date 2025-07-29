import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import indicativeData from '../indicativePriceData/dciData.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import Popover from 'react-native-popover-view';
import { Card, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
export default function IndicativeDCIScreen() {
    //variable is used for navigating through the screens
    const navigation = useNavigation()
    //Variable is used for storing the json datas
    const data = indicativeData.IndicativeDCIPrices;
    //variable is used to store the currency label
    const [currency, setCurrency] = useState(data.InvestmentCurrency);
    //variable is used to store the boolean value to open/close the dropdown
    const [open, setOpen] = useState(false);
    //variable is used to store the currency datas
    const [currencies, setCurrencies] = useState([
        { label: "USD ", value: "USD" },
        { label: "EUR", value: "EUR" },
        { label: "GBP ", value: "GBP" },
        { label: "AUD ", value: "AUD" },
        { label: "INR ", value: "INR" },
        { label: "JPY ", value: "JPY" },
        { label: "CAD ", value: "CAD" },
        { label: "CHF ", value: "CHF" },
        { label: "CNY ", value: "CNY" },
        { label: "SGD ", value: "SGD" },
    ]);
    //variable is used to store the boolean value for the popover
    const [visible, setVisible] = useState(false);
    //function is used to handle back navigation
    const handleExit = () => {
        setVisible(false);
        navigation.goBack()
    };
    return (
        <View style={{ flex: 1, }}>
            <SafeAreaView style={{ backgroundColor: '#1f4d82', height: 110 }}>
                <StatusBar translucent={true} barStyle={"light-content"} />
                <View style={{ height: 50, backgroundColor: '#1f4d82', flexDirection: 'row' }}>
                    <Icon name="arrow-back" type="ionicon" color={'white'} size={26} containerStyle={{ paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => { setVisible(true) }} />
                    <Text style={{ fontWeight: "bold", fontSize: 22, color: 'white', textAlignVertical: 'center' }}>Indicative DCI Prices</Text>
                </View>
            </SafeAreaView>
            {/* Dropdown */}
            <View style={styles.containerDrop}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1f4d82', alignSelf: 'center' }}>Investment Currency:</Text>
                <DropDownPicker
                    listMode="SCROLLVIEW"
                    open={open}
                    value={currency}
                    items={currencies}
                    setOpen={setOpen}
                    setValue={setCurrency}
                    setItems={setCurrencies}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    listItemLabelStyle={styles.listItem}
                    selectedItemContainerStyle={styles.selectedItem}
                    textStyle={{ color: "#1E3A8A", fontWeight: 'bold', textAlign: 'left', paddingLeft: 10 }}
                    selectedItemLabelStyle={{ fontWeight: "bold", color: "#1E3A8A" }}
                />
            </View>
            {/* Info Section */}
            <Card containerStyle={{ borderWidth: 1, borderRadius: 10, marginHorizontal: 10, backgroundColor: "white", justifyContent: "center", alignItems: 'center', borderColor: '#1E3A8A', marginBottom: 10 }} >
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Underlying:</Text>
                        <Text style={styles.infoValue}>{data.Underlying}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Currency:</Text>
                        <Text style={styles.infoValue}>{data.Currency}</Text>

                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Investment:</Text>
                        <Text style={styles.infoValue}>{data.InvestmentAmount}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Spot Reference:</Text>
                        <Text style={styles.infoValue}>{data.SpotReference}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Time Stamp:</Text>
                        <Text style={styles.infoValue}>{data.TimeStamp}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Client Segment:</Text>
                        <Text style={styles.infoValue}>{data.ClientSegment}</Text>
                    </View>
                </View>
            </Card>
            <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={styles.container}>
                {data.InvestmentPeriods.map((period, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardTitle}>Investment Period: {period.Period}</Text>
                        <View style={styles.subHeader}>
                            <Text style={styles.subHeaderText}>Expiry Date: {period.ExpiryDate}</Text>
                            <Text style={styles.subHeaderText}>Maturity Date: {period.MaturityDate}</Text>
                        </View>
                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableCell, styles.tableHeaderText]}>Target Conversion Rate</Text>
                            <Text style={[styles.tableCell, styles.tableHeaderText]}>Enhanced Rate</Text>
                        </View>
                        {/* Table Rows */}
                        {period.Rates.map((rate, idx) => (
                            <Pressable key={idx} style={styles.tableRow} onPress={() => {
                                navigation.navigate("transferScreen",
                                    {
                                        expiryDate: period.ExpiryDate,
                                        maturityDate: period.MaturityDate,
                                        targetRate: rate.TargetConversionRate,
                                        enhancedRate: rate.EnhancedRate,
                                        country: data.Underlying,
                                        period: period.Period
                                    }

                                )
                            }}>
                                <Text style={styles.tableCell}>{rate.TargetConversionRate}</Text>
                                <Text style={styles.tableCell}>{rate.EnhancedRate}</Text>
                            </Pressable>
                        ))}
                    </View>
                ))}

            </ScrollView>
            <Popover
                isVisible={visible}
                onRequestClose={() => setVisible(false)}
                popoverStyle={styles.popover}
            >
                <Icon name='exit-to-app' type='materialcommunity' size={40} color={'#1f4d82'} containerStyle={{ alignItems: 'center' }} />
                <Text style={styles.title}>Are you want to exit this page?</Text>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.btn, styles.noBtn]} onPress={() => setVisible(false)}>
                        <Text style={styles.noText}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.yesBtn]} onPress={handleExit}>
                        <Text style={styles.yesText}>Yes</Text>
                    </TouchableOpacity>
                </View>
            </Popover>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 10
    },
    containerDrop: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 10
    },
    dropdown: {
        borderColor: "#1E3A8A",
        borderWidth: 1,
        marginHorizontal: 10,
        width: 170,
        borderRadius: 30,
        backgroundColor: "#F9FAFB",
    },
    dropdownContainer: {
        borderColor: "#1E3A8A",
        borderWidth: 1,
        borderRadius: 30,
        width: 170,
        marginHorizontal: 10,
    },
    listItem: {
        fontSize: 14,
        color: "#111827",
    },
    selectedItem: {
        backgroundColor: "#DBEAFE",
    },
    infoBox: {
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoLabel: {
        fontWeight: 'bold',
        fontSize: 13,
        color: '#1f4d82'
    },
    infoValue: {
        fontSize: 11,
        color: 'black',
        paddingVertical: 5,
        marginHorizontal: 10,
        fontWeight: 'bold'
    },
    card: {
        backgroundColor: '#1f4d82',
        marginVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden',
        paddingVertical: 20,

    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingVertical: 8,
        textAlign: 'center',
        color: 'white',
    },
    subHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    subHeaderText: {
        color: "white",
        fontSize: 12
    },
    tableHeader: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',

    },
    tableHeaderText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ccc'
    },
    tableCell: {
        flex: 1,
        paddingVertical: 8,
        textAlign: 'center',
        fontSize: 14,
        color: '#fff',
        borderRightWidth: 1,
        borderColor: 'white'
    },

    popover: {
        width: 350,
        borderRadius: 10,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 19,
        fontWeight: "bold",
        paddingVertical: 25,
        color: '#1f4d82'
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    btn: {
        paddingVertical: 8,
        paddingHorizontal: 40,
        borderRadius: 20,
        marginHorizontal: 30
    },
    yesBtn: { backgroundColor: '#1f4d82' },
    noBtn: { backgroundColor: "#ccc" },
    yesText: {
        color: "#fff",
        fontWeight: "bold"
    },
    noText: {
        color: "#000",
        fontWeight: "bold"
    },
});

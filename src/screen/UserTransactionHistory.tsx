import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TextInput, Modal, Pressable, TouchableOpacity } from 'react-native';
import scale from '../components/Scale';
import React, { useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import strings from '../components/strings';

const UserTransactionHistoryHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.personalDetailsHeader}>
      <View style={styles.backIconHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.personText}>{strings.UserTransactionHistory.transactionHistory}</Text>
      </View>
    </View>
  );
};

const formatCurrency = (n: number) => `₹${n.toFixed(2)}`;

const UserTransactionHistoryBalance = () => {
  const [total] = useState<number>(500);
  const [expense] = useState<number>(187);
  const [isIncomeActive, setIsIncomeActive] = useState(false);
  const onToggleIncome = () => setIsIncomeActive(prev => !prev);

  const goalStep = 200;
  const spent = Math.max(0, Math.min(expense, total));
  const goal = Math.max(goalStep, Math.ceil(spent / goalStep) * goalStep);
  const greenRemaining = Math.max(goal - spent, 0);
  const percentWhite = goal > 0 ? Math.max(0, Math.min(100, (spent / goal) * 100)) : 0;
  const percentSpentOfTotal = total > 0 ? Math.round((spent / total) * 100) : 0;

  return (
    <View style={styles.balanceShowHeader}>
      <View style={styles.balanceHeader}>
        <View>
          <View style={styles.incomeTextHeader}>
            <Image
              source={require('../assets/Income.png')}
              style={[styles.incomeIcon, isIncomeActive && styles.incomeIconActive]}
            />
            <Text style={styles.incomeText}>{strings.UserTransactionHistory.totalBalance}</Text>
          </View>
          <Text style={styles.price}>{formatCurrency(total)}</Text>
        </View>

        <View style={styles.divideLine} />

        <View>
          <View style={styles.incomeTextHeader}>
            <Image source={require('../assets/Expense.png')} style={styles.incomeIcon} />
            <Text style={styles.incomeText}>{strings.UserTransactionHistory.totalExpense}</Text>
          </View>
          <Text style={styles.priceExpense}>-{formatCurrency(spent).replace('₹', '₹')}</Text>
        </View>
      </View>

      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${percentWhite}%` }]} />
          <View style={styles.leftValuePill}>
            <Text style={styles.leftValueText}>{formatCurrency(greenRemaining)}</Text>
          </View>
          <View style={styles.rightValuePill}>
            <Text style={styles.rightValueText}>{formatCurrency(spent)}</Text>
          </View>
        </View>

        <View style={styles.spentInfoRow}>
          <TouchableOpacity onPress={onToggleIncome} >
            <Image
              source={
                isIncomeActive
                  ? require('../assets/checkIcons.png')
                  : require('../assets/Expense.png')
              }
              style={styles.checkIcons}
            />
          </TouchableOpacity>
          <Text style={styles.spentInfoText}>
            You Have Spent {percentSpentOfTotal}% Of Your Total Balance.
          </Text>
        </View>
      </View>
    </View>
  );
};

const UserAppTransactionHistoryMainContainer = () => {
  // single-select tabs
  const [isAll, setIsAll] = useState(true);
  const [isTopup, setIsTopup] = useState(false);
  const [isSpent, setIsSpent] = useState(false);

  const selectAll = () => { setIsAll(true); setIsTopup(false); setIsSpent(false); };
  const selectTopup = () => { setIsAll(false); setIsTopup(true); setIsSpent(false); };
  const selectSpent = () => { setIsAll(false); setIsTopup(false); setIsSpent(true); };

  // 🔎 search state
  const [searchQuery, setSearchQuery] = useState('');

  // ---- sample transactions ----
  const transactions = useMemo(
    () => ([
      { id: '1', title: 'Audio Call',  subtitle: 'Suraiya Parvin', amount: -9.04,  date: '21/08/2025', kind: 'debit'  as const, icon: require('../assets/Groupdata.png') },
      { id: '2', title: 'Topup',       subtitle: 'UPI',            amount: 100,    date: '21/08/2025', kind: 'topup'  as const, icon: require('../assets/Groupdata.png')  },
      { id: '3', title: 'Sent Gift | Rose', subtitle: 'Suraiya Parvin', amount: -10.00, date: '21/08/2025', kind: 'debit' as const, icon: require('../assets/Groupdata.png') },
      { id: '4', title: 'Video Call',  subtitle: 'Suraiya Parvin', amount: -9.04,  date: '21/08/2025', kind: 'debit'  as const, icon: require('../assets/Groupdata.png') },
      { id: '5', title: 'Sent Gift | Rose', subtitle: 'Suraiya Parvin', amount: -10.00, date: '21/08/2025', kind: 'debit' as const, icon: require('../assets/Groupdata.png') },
      { id: '6', title: 'Audio Call',  subtitle: 'Suraiya Parvin', amount: -9.04,  date: '21/08/2025', kind: 'debit'  as const, icon: require('../assets/Groupdata.png') },
      { id: '7', title: 'Topup',       subtitle: 'UPI',            amount: 100,    date: '21/08/2025', kind: 'topup'  as const, icon: require('../assets/Groupdata.png')  },
      { id: '8', title: 'Sent Gift | Rose', subtitle: 'Suraiya Parvin', amount: -10.00, date: '21/08/2025', kind: 'debit' as const, icon: require('../assets/Groupdata.png') },
      { id: '9', title: 'Video Call',  subtitle: 'Suraiya Parvin', amount: -9.04,  date: '21/08/2025', kind: 'debit'  as const, icon: require('../assets/Groupdata.png') },
      { id: '10', title: 'Sent Gift | Rose', subtitle: 'Suraiya Parvin', amount: -10.00, date: '21/08/2025', kind: 'debit' as const, icon: require('../assets/Groupdata.png') },
    ]),
    []
  );

  const transactionsSpent = useMemo(
    () => ([
      { id: '11', title: 'Audio Call',  subtitle: 'Suraiya Parvin', amount: -9.04,  date: '21/08/2025', kind: 'debit'  as const, icon: require('../assets/Groupdata.png') },
      { id: '12', title: 'Topup',       subtitle: 'UPI',            amount: 100,    date: '21/08/2025', kind: 'topup'  as const, icon: require('../assets/Groupdata.png')  },
      { id: '13', title: 'Sent Gift | Rose', subtitle: 'Suraiya Parvin', amount: -10.00, date: '21/08/2025', kind: 'debit' as const, icon: require('../assets/Groupdata.png') },
      { id: '14', title: 'Video Call',  subtitle: 'Suraiya Parvin', amount: -9.04,  date: '21/08/2025', kind: 'debit'  as const, icon: require('../assets/Groupdata.png') },
    ]),
    []
  );

  const transactionsTopup = useMemo(
    () => ([
      { id: '15', title: 'Audio Call',  subtitle: 'Suraiya Parvin', amount: -9.04,  date: '21/08/2025', kind: 'debit'  as const, icon: require('../assets/Groupdata.png') },
      { id: '16', title: 'Topup',       subtitle: 'UPI',            amount: 100,    date: '21/08/2025', kind: 'topup'  as const, icon: require('../assets/Groupdata.png')  },
      { id: '17', title: 'Sent Gift | Rose', subtitle: 'Suraiya Parvin', amount: -10.00, date: '21/08/2025', kind: 'debit' as const, icon: require('../assets/Groupdata.png') },
    ]),
    []
  );

  // 🔎 filter helper
  const filterByQuery = (arr: typeof transactions) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return arr;
    return arr.filter(item => {
      const parts = [
        item.title,
        item.subtitle,
        item.date,
        String(item.amount),
        item.amount < 0 ? `- ${Math.abs(item.amount)}` : `+ ${item.amount}`,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return parts.includes(q);
    });
  };

  // filtered datasets for each tab
  const filteredAll = useMemo(() => filterByQuery(transactions), [transactions, searchQuery]);
  const filteredTopup = useMemo(() => filterByQuery(transactionsTopup), [transactionsTopup, searchQuery]);
  const filteredSpent = useMemo(() => filterByQuery(transactionsSpent), [transactionsSpent, searchQuery]);

  const renderItem = ({ item }: any) => {
    const negative = item.amount < 0;
    return (
      <>
        <View style={styles.row}>
          <View style={styles.leftIconWrap}>
            <Image source={item.icon} style={styles.leftIconImg} />
          </View>

          <View style={styles.rowCenter}>
            <Text style={styles.rowTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.rowSub} numberOfLines={1}>{item.subtitle}</Text>
          </View>

          <View style={styles.rowRight}>
            <Text style={[styles.amountText, negative ? styles.amountNeg : styles.amountPos]}>
              {negative ? `- ₹${Math.abs(item.amount).toFixed(2)}` : `+ ₹${item.amount.toFixed(0)}`}
            </Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        </View>
        <View style={styles.rowDivider} />
      </>
    );
  };

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.inputBoxserch}>
        <Image source={require('../assets/SearchMain.png')} style={styles.serchIcon} />
        <TextInput
          style={styles.serchText}
          placeholder={strings.UserTransactionHistory.searchTransaction}
          placeholderTextColor={'#3F897B'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.containTextHeader}>
        {/* All */}
        <TouchableOpacity
          style={[
            styles.allTransactionsHeader,
            { backgroundColor: isAll ? '#00604D' : '#BBFFEC' },
          ]}
          onPress={selectAll}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.allTransactions,
              { color: isAll ? '#FFFFFF' : '#00604D' },
            ]}
          >
            {strings.UserTransactionHistory.allTransactions}
          </Text>
        </TouchableOpacity>

        {/* Top up */}
        <TouchableOpacity
          style={[
            styles.allTransactionsHeader,
            { backgroundColor: isTopup ? '#00604D' : '#BBFFEC' },
          ]}
          onPress={selectTopup}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.allTransactions,
              { color: isTopup ? '#FFFFFF' : '#00604D' },
            ]}
          >
            {strings.UserTopUpScreen.topup}
          </Text>
        </TouchableOpacity>

        {/* Spent */}
        <TouchableOpacity
          style={[
            styles.allTransactionsHeader,
            { backgroundColor: isSpent ? '#00604D' : '#BBFFEC' },
          ]}
          onPress={selectSpent}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.allTransactions,
              { color: isSpent ? '#FFFFFF' : '#00604D' },
            ]}
          >
            {strings.UserTransactionHistory.spentHistory}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lists (search-aware) */}
      {isAll && (
        <View style={styles.listWrap}>
          <FlatList
            data={filteredAll}
            keyExtractor={(item, idx) => `${item.id}-${idx}`}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: scale(24) }}
          />
        </View>
      )}
      {isTopup && (
        <View style={styles.listWrap}>
          <FlatList
            data={filteredTopup}
            keyExtractor={(item, idx) => `${item.id}-${idx}`}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: scale(24) }}
          />
        </View>
      )}
      {isSpent && (
        <View style={styles.listWrap}>
          <FlatList
            data={filteredSpent}
            keyExtractor={(item, idx) => `${item.id}-${idx}`}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: scale(24) }}
          />
        </View>
      )}
    </View>
  );
};

const UserTransactionHistory = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlayBackground} >
        <UserTransactionHistoryHeader />
        <UserTransactionHistoryBalance />
        <UserAppTransactionHistoryMainContainer />
      </View>
    </SafeAreaView>
  );
};

export default UserTransactionHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1AC8B9',
  },
  overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.44)',
  },
  personalDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginHorizontal: scale(20),
    marginTop: scale(20),
  },
  backIconHeaders: {
    width: "100%",
    marginTop: '5%',
    borderRadius: scale(15),
    borderColor: '#FFFF',
    borderWidth: scale(2),
  },
  backIconHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  personText: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#00604D',
    marginLeft: scale(20),
  },
  backButton: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
  },
  dimandIcons: { width: scale(20), height: scale(20), resizeMode: 'contain' },
  incomeIcon: { width: scale(12), height: scale(12), resizeMode: 'contain' },
  incomeIconActive: { tintColor: '#0B6F5D' },
  checkIcons: { width: scale(16), height: scale(16), resizeMode: 'contain', marginRight: scale(10) },
  incomeText: { fontSize: scale(12), fontWeight: "400", color: "#00604D", marginLeft: scale(5) },
  incomeTextHeader: { flexDirection: "row", alignItems: "center" },
  price: { fontSize: scale(24), fontWeight: "700", color: "#137561" },
  levelText: { fontSize: scale(14), fontWeight: "600", color: "#137561", marginLeft: scale(10) },
  levelTextTwo: { fontSize: scale(12), fontWeight: "600", color: "#137561", textAlign: "center" },
  priceExpense: { fontSize: scale(24), fontWeight: "700", color: "#FF0000" },
  divideLine: { width: scale(1.8), height: "80%", backgroundColor: "#DFF7E2" },
  balanceHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  balanceShowHeader: { marginHorizontal: scale(35), marginTop: scale(25) },

  progressWrap: { marginTop: scale(18) },
  progressTrack: {
    width: '100%', height: scale(26), backgroundColor: '#0B6F5D',
    borderRadius: scale(30), overflow: 'hidden', justifyContent: 'center', position: 'relative',
  },
  progressFill: { position: 'absolute', right: 0, top: scale(2), bottom: scale(2), backgroundColor: '#FFFFFF', borderRadius: scale(30), zIndex: 1 },
  leftValuePill: { position: 'absolute', left: scale(6), top: scale(2), bottom: scale(2), backgroundColor: '#0B6F5D', borderRadius: scale(30), paddingHorizontal: scale(10), alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  leftValueText: { color: '#FFFFFF', fontSize: scale(12), fontWeight: '700' },
  rightValuePill: {
    position: 'absolute', right: scale(6), top: scale(2), bottom: scale(2),
    backgroundColor: '#FFFFFF', borderRadius: scale(30), paddingHorizontal: scale(10),
    alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 }, shadowRadius: 2, elevation: 1, zIndex: 3,
  },
  rightValueText: { color: '#0A1F44', fontSize: scale(12), fontWeight: '700' },
  spentInfoRow: { flexDirection: 'row', alignItems: 'center', marginTop: scale(10) },
  tickText: { color: '#00604D', fontSize: scale(10), fontWeight: '800', lineHeight: scale(12) },
  spentInfoText: { color: '#00604D', fontSize: scale(16), fontWeight: '400' },

  bottomContainer: {
    flex: 1,
    marginTop: "10%",
    borderTopRightRadius: scale(40),
    borderTopLeftRadius: scale(40),
    backgroundColor: '#B2EEDF',
    paddingTop: scale(10),
    overflow: 'visible',
    borderColor: "#FFFFFF",
    borderWidth: scale(2)
  },
  containText: { fontSize: scale(10), fontWeight: '600', color: '#007F66', marginHorizontal: scale(25) },
  inputBoxserch: {
    width: "90%", height: scale(45), backgroundColor: '#CFF4EB',
    flexDirection: "row", alignItems: "center", borderColor: "#FFFFFF", borderWidth: scale(2),
    borderRadius: scale(30), paddingHorizontal: scale(15), alignSelf: 'center',
  },
  serchText: { color: "#3F897B", fontSize: scale(12), fontWeight: "600", width: "90%" },
  serchIcon: { width: scale(17), height: scale(17), resizeMode: 'contain', marginRight: scale(5) },
  allTransactions: { fontSize: scale(14), fontWeight: '600' },
  allTransactionsHeader: { paddingVertical: scale(5), paddingHorizontal: scale(20), alignItems: 'center', justifyContent: 'center', borderRadius: scale(72) },
  containTextHeader: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: scale(20), marginTop: scale(15) },
  btnActive: { backgroundColor: '#BBFFEC' },
  txtActive: { color: '#00604D' },

  /* list styles */
  listWrap: {
    marginTop: scale(10),
    marginHorizontal: scale(12),
    height: '61%',
  },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: scale(12), paddingRight: scale(6) },
  leftIconWrap: { marginRight: scale(10), marginLeft: scale(6) },
  leftIconImg: { width: scale(42), height: scale(42), resizeMode: 'contain' },
  rowCenter: { flex: 1 },
  rowTitle: { fontSize: scale(14), fontWeight: '600', color: '#00604D' },
  rowSub: { fontSize: scale(12), fontWeight: '400', color: '#00A172', marginTop: scale(2) },
  rowRight: { alignItems: 'flex-end', justifyContent: 'center' },
  amountText: { fontSize: scale(14), fontWeight: '500' },
  amountNeg: { color: '#FF0000' },
  amountPos: { color: '#00604D' },
  dateText: { fontSize: scale(12), color: '#00A172', fontWeight: '400' },
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#7BD5BBD9',
    marginLeft: scale(60),
    borderWidth: scale(0.5),
    borderColor: '#7BD5BBD9',
  },
});

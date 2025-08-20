import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TextInput, Modal, Pressable, TouchableOpacity } from 'react-native';
import scale from '../components/Scale';
import React, { useState, useMemo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import strings from '../components/strings';

const UserTopUpScreenHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.personalDetailsHeader}>
      <View style={styles.backIconHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.personText}>{strings.UserTopUpScreen.topup}</Text>
      </View>
    </View>
  );
};

const formatCurrency = (n: number) => `₹${n.toFixed(2)}`;

const UserTopUpScreenBalance = () => {
  const navigation = useNavigation();

  // ---- Dynamic (API updatable) ----
  const [total, setTotal] = useState<number>(500);
  const [expense, setExpense] = useState<number>(187);

  // NEW: toggle state — check icon tap se income icon change hoga
  const [isIncomeActive, setIsIncomeActive] = useState(false);
  const onToggleIncome = () => setIsIncomeActive(prev => !prev);

  // API se values milne par use karo:
  const setFromApi = useCallback((t: number, e: number) => {
    setTotal(t);
    setExpense(e);
  }, []);

  // ------- EXACT SS logic -------
  const goalStep = 200;
  const spent = Math.max(0, Math.min(expense, total));
  const goal = Math.max(goalStep, Math.ceil(spent / goalStep) * goalStep);
  const greenRemaining = Math.max(goal - spent, 0);      // -> 13.00
  const percentWhite = goal > 0 ? Math.max(0, Math.min(100, (spent / goal) * 100)) : 0;
  const percentSpentOfTotal = total > 0 ? Math.round((spent / total) * 100) : 0;
  const [levelProgress, setLevelProgress] = useState(0.35); // 35% filled
// optional helper: API percent (0..100) se set karne ke liye
const setLevelProgressFromApi = (pct: number) => {
  const clamped = Math.max(0, Math.min(100, pct));
  setLevelProgress(clamped / 100);
};

  return (
    <View style={styles.balanceShowHeader}>
      <View style={styles.balanceHeader}>
        <View>
          <View style={styles.incomeTextHeader}>
            <Image
              source={require('../assets/Income.png')}
              style={[styles.incomeIcon, isIncomeActive && styles.incomeIconActive]}
            />
            <Text style={styles.incomeText}>{strings.UserTopUpScreen.totalBalance}</Text>
          </View>
          <Text style={styles.price}>{formatCurrency(total)}</Text>
        </View>

        <View style={styles.divideLine} />

        <View>
          <View style={styles.incomeTextHeader}>
            <Image source={require('../assets/Expense.png')} style={styles.incomeIcon} />
            <Text style={styles.incomeText}>{strings.UserTopUpScreen.totalExpense}</Text>
          </View>
          <Text style={styles.priceExpense}>-{formatCurrency(spent).replace('₹','₹')}</Text>
        </View>
      </View>

      {/* Progress Bar: GREEN base + WHITE fill from RIGHT (exact SS) */}
      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          {/* WHITE FILL overlay (inner pill feel) */}
          <View style={[styles.progressFill, { width: `${percentWhite}%` }]} />

          {/* LEFT GREEN CHIP (₹13.00) */}
          <View style={styles.leftValuePill}>
            <Text style={styles.leftValueText}>{formatCurrency(greenRemaining)}</Text>
          </View>

          {/* RIGHT WHITE CHIP (₹187.00) */}
          <View style={styles.rightValuePill}>
            <Text style={styles.rightValueText}>{formatCurrency(spent)}</Text>
          </View>
        </View>

        {/* Info line + check icon (click to toggle income icon) */}
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
     <View style={styles.boxLevel}>
  <View style={styles.incomeTextHeader}>
    <Image source={require('../assets/twotonelevel.png')} style={styles.backButton} />
    <Text style={styles.levelText}>Level 2</Text>
  </View>
    <View style={styles.levelProgressTrack}>
      <View
        style={[
          styles.levelProgressFill,
          { width: `${Math.max(0, Math.min(1, levelProgress)) * 100}%` },
        ]}
      />
    </View>
    <Text style={styles.levelProgressText}>
      Top up 100 tokens to level up
    </Text>
</View>
<View style={styles.topupInput}>
    <Text style={styles.levelProgresspriceText}>₹500</Text>
    <TouchableOpacity style={styles.topupHeader}>
        <Text style={styles.topupText}>Topup</Text>
    </TouchableOpacity>
</View>
<Text style={styles.priceTittle}>Bonus 2%, Total Value  ₹510.00, Level 4</Text>
<View style={styles.levelRuleHeder}>
    <Text style={styles.levelRule}>Level Rule</Text>
</View>
<UserTopUpScreenAmountDetail/>
    </View>
  );
};

const formatINR = (n: number) =>
  `₹${Number(n).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const UserTopUpScreenAmountDetail = () => {
  const navigation = useNavigation();

  // -------- Single array of objects (precomputed totals) --------
  const data = useMemo(
    () => [
      { id: '1',  level: 1,  amount: 100,     bonus: 0,  totalValue: 100 },
      { id: '2',  level: 2,  amount: 500,     bonus: 2,  totalValue: 510 },
      { id: '3',  level: 3,  amount: 2000,    bonus: 4,  totalValue: 2080 },
      { id: '4',  level: 4,  amount: 5000,    bonus: 6,  totalValue: 5300 },
      { id: '5',  level: 5,  amount: 10000,   bonus: 8,  totalValue: 10800 },
      { id: '6',  level: 6,  amount: 25000,   bonus: 10, totalValue: 27500 },
      { id: '7',  level: 7,  amount: 50000,   bonus: 12, totalValue: 56000 },
      { id: '8',  level: 8,  amount: 75000,   bonus: 14, totalValue: 85500 },
      { id: '9',  level: 9,  amount: 100000,  bonus: 16, totalValue: 116000 },
      { id: '10', level: 10, amount: 200000,  bonus: 20, totalValue: 240000 },
    ],
    []
  );

  const renderRow = ({ item }: { item: any }) => {
    const isOdd = item.level % 2 === 1;
    return (
      <View
        style={[
          styles.amountHeaderTwo,
          { backgroundColor: isOdd ? '#A2E8D8' : 'transparent' },
        ]}
      >
        <Text style={styles.amount}>{formatINR(item.amount)}</Text>
        <Text style={styles.amount}>{item.bonus}%</Text>
        <Text style={styles.amount}>{formatINR(item.totalValue)}</Text>

        <View style={styles.dimandHeader}>
          <Image source={require('../assets/dimandIcons.png')} style={styles.dimandIcons} />
          <Text style={styles.dimandText}>{item.level}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.amountHeaderAll}>
      {/* Header row */}
      <View style={styles.amountHeader}>
        <Text style={styles.amount}>Amount</Text>
        <Text style={styles.amount}>Bonus</Text>
        <Text style={styles.amount}>Total Value</Text>
        <Text style={styles.amount}>Level</Text>
      </View>

      {/* Dynamic rows */}
      <View style={{height:"52%"}}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderRow}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingTop: scale(5), paddingBottom: scale(10) }}
      />
      </View>
    </View>
  );
};

const UserTopUpScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <UserTopUpScreenHeader />
      <UserTopUpScreenBalance />
      
    </SafeAreaView>
  );
};

export default UserTopUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1AC8B9',
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
  dimandIcons:{
 width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  incomeIcon:{
    width: scale(12),
    height: scale(12),
    resizeMode: 'contain',
  },
  // Active tint for income icon when toggled (no layout change)
  incomeIconActive: {
    tintColor: '#0B6F5D',
  },
  checkIcons:{
    width: scale(16),
    height: scale(16),
    resizeMode: 'contain',
    marginRight:scale(10)
  },
  incomeText:{
    fontSize:scale(12),
    fontWeight:"400",
    color:"#00604D",
    marginLeft:scale(5)
  },
  incomeTextHeader:{
    flexDirection:"row",
    alignItems:"center"
  },
  price:{
    fontSize:scale(24),
    fontWeight:"700",
    color:"#137561",
  },
  levelText:{
    fontSize:scale(14),
    fontWeight:"600",
    color:"#137561",
    marginLeft:scale(10)
  },
    levelTextTwo:{
    fontSize:scale(12),
    fontWeight:"600",
    color:"#137561",
textAlign:"center"
  },
  
  priceExpense:{
    fontSize:scale(24),
    fontWeight:"700",
    color:"#FF0000",
  },
  divideLine:{
    width:scale(1.8),
    height:"80%",
    backgroundColor:"#DFF7E2"
  },
  balanceHeader:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  balanceShowHeader:{
    marginHorizontal:scale(35),
    marginTop:scale(25)
  },

  /* -------- Progress bar (exact SS) -------- */
  progressWrap:{
    marginTop: scale(18),
  },
  progressTrack:{
    width: '100%',
    height: scale(26),
    backgroundColor: '#0B6F5D',         // green base
    borderRadius: scale(30),
    overflow: 'hidden',
    justifyContent: 'center',
    position: 'relative',
  },
  progressFill:{
    position: 'absolute',
    right: 0,
    top: scale(2),
    bottom: scale(2),
    backgroundColor: '#FFFFFF',         // white fill (spent)
    borderRadius: scale(30),
    zIndex: 1,
  },
  leftValuePill:{
    position: 'absolute',
    left: scale(6),
    top: scale(2),
    bottom: scale(2),
    backgroundColor: '#0B6F5D',
    borderRadius: scale(30),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  leftValueText:{
    color: '#FFFFFF',
    fontSize: scale(12),
    fontWeight: '700'
  },
  rightValuePill:{
    position: 'absolute',
    right: scale(6),
    top: scale(2),
    bottom: scale(2),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(30),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
    zIndex: 3, // above white fill
  },
  rightValueText:{
    color: '#0A1F44',
    fontSize: scale(12),
    fontWeight: '700'
  },
  spentInfoRow:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(10)
  },
  tickText:{
    color: '#00604D',
    fontSize: scale(10),
    fontWeight: '800',
    lineHeight: scale(12)
  },
  spentInfoText:{
    color: '#00604D',
    fontSize: scale(16),
    fontWeight: '400'
  },
  boxLevel:{
    backgroundColor:"#A2E8D8",
    padding:scale(10),
    borderRadius:scale(8),
    marginTop:scale(12)
  },
levelProgressTrack: {
  height: scale(6),
  borderRadius: scale(100),
  backgroundColor: '#F0FFF6',  // light mint/white track (right side)
  overflow: 'hidden',
   marginTop: scale(10),
},
levelProgressFill: {
  height: '100%',
  borderRadius: scale(100),
  backgroundColor: '#FF9F4B',  // <-- requested orange fill
},
levelProgressText: {
  textAlign: 'center',
  marginTop: scale(8),
  color: '#00604D',
  fontSize: scale(12),
  fontWeight: '600',
},

levelProgresspriceText: {
  color: '#00604D',
  fontSize: scale(12),
  fontWeight: '600',
     marginLeft:scale(15)
},
topupInput:{
    width:"100%",
    height:scale(45),
    backgroundColor:"#BDEFE4",
    borderRadius:scale(38),
    borderWidth:scale(2),
    borderColor:"#FFFFFF",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
      marginTop: scale(10),
},
topupHeader:{
    backgroundColor:"#018C71",
    paddingVertical:scale(9),
    paddingHorizontal:scale(20),
    borderRadius:scale(16),
    alignItems:"center",
    justifyContent:"center",
    marginRight:scale(2)
},
topupText:{
    fontSize:scale(14),
    fontWeight:"700",
    color:"#FFFFFF",
 
},
priceTittle:{
    fontSize:scale(10),
    fontWeight:"600",
    color:"#0BBB99",
    marginLeft:scale(18),
    // marginTop:scale(3)
},
levelRule:{
   fontSize:scale(16),
    fontWeight:"600",
    color:"#00604D",  
},
levelRuleHeder:{
width:"100%",
justifyContent:"center",
alignItems:"center",
   backgroundColor:"#A2E8D8",
    padding:scale(3),
    borderRadius:scale(8),
    marginTop:scale(15)
},
 amount: {
    color: "#00604D",
    fontSize: scale(13),
    fontWeight: "600",
  },
  amountHeader: {
    flexDirection: "row",
    // alignItems:"center",
    justifyContent: "space-between",
    marginVertical: scale(10),
    marginHorizontal: scale(15),
  },

  amountHeaderTwo: {
    flexDirection: "row",
    // alignItems:"center",
    justifyContent: "space-between",
    // marginTop: scale(15),
    // marginHorizontal: scale(15),
    backgroundColor: "#A2E8D8", // base; odd/even override in render
    borderRadius: scale(8),
    paddingVertical: scale(5),
    paddingHorizontal: scale(15)
  },

  dimandHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  dimandText: {
    fontSize: scale(12),
    fontWeight: "500",
    color: "#137561",
    marginLeft: scale(5),
  },
  amountHeaderAll: {
    // justifyContent: "center",
  },

//   dimandIcons: {
//     width: scale(22),
//     height: scale(22),
//     resizeMode: 'contain',
//   },


});

import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, Modal, Text } from 'react-native';
import React, { useState } from 'react';
import scale from '../components/Scale';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import strings from '../components/strings';


const UserProfileImageContain = ({ onProfileUpdate }: any) => {
        const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImagePicker = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo', quality: 1 });
        if (result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            if (uri) {
                setSelectedImage(uri);
                onProfileUpdate();
            }
        }
    };

    return (
        < >
             <TouchableOpacity onPress={() => {
                            navigation.goBack();
                        }}>
                            <Image source={require('../assets/back.png')} style={styles.backButton} />
                        </TouchableOpacity>
                        <View style={styles.imageContainer}>
            <Image
                source={
                    selectedImage
                        ? { uri: selectedImage }
                        : require('../assets/GroupIcons.png')
                }
                style={styles.groupIcons}
            />
            <TouchableOpacity onPress={handleImagePicker}>
                <Image
                    source={require('../assets/solarcamera.png')}
                    style={styles.solarcameraIcons}
                />
            </TouchableOpacity>
            </View>
        </>
    );
};

const UserProfileAllContain = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.mainBodyHeader}>
            <Text style={styles.name}>Suraiya Parvin</Text>
            <Text style={styles.email}>suraiya@gmail.com</Text>
            <View style={styles.personalBox}>
                <TouchableOpacity style={styles.menuItem}
                    onPress={() => {
                        navigation.navigate('UserPersonalDetails' as never);
                    }}
                >
                    <Image source={require('../assets/ProfileIcon.png')} style={styles.profileIcon} />
                    <Text style={styles.menuText}>{strings.UserProfileScreen.personalDetails}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => {
                        navigation.navigate('UserchangePassword' as never);
                    }}>
                    <Image source={require('../assets/lockbroken.png')} style={styles.profileIcon} />
                    <Text style={styles.menuText}>{strings.UserProfileScreen.changePassword}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItemLast}
                onPress={() => {
                        navigation.navigate('UserAboutMeScreen' as never);
                    }}>
                    <Image source={require('../assets/information.png')} style={styles.profileIcon} />
                    <Text style={styles.menuText}>{strings.UserProfileScreen.aboutMe}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.deleteButton}>
                <Image source={require('../assets/deletes.png')} style={styles.profileIcon} />
                <Text style={styles.deleteText}>{strings.UserProfileScreen.deleteAccount}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logOutButton}>
                <Image source={require('../assets/Frame.png')} style={styles.profileIcon} />
                <Text style={styles.menuText}>{strings.UserProfileScreen.logout}</Text>
            </TouchableOpacity>
        </View>
    );
};

const UserProfileScreen = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const renderProfileUpdateModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <View style={styles.thumbCircle}>
                            <Image
                                source={require('../assets/thumbsUp.png')}
                                style={styles.thumbImage}
                            />
                        </View>
                        <Text style={styles.wooHooText}>{strings.UserProfileScreen.wooHoo}</Text>
                        <Text style={styles.successMessage}>Your profile picture has been updated successfully!</Text>
                        <TouchableOpacity style={styles.doneButton} onPress={() => setIsModalVisible(false)}>
                            <Text style={styles.doneButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.overlayBackground} >
            <ImageBackground
                source={require('../assets/profileBackground.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <UserProfileImageContain onProfileUpdate={() => setIsModalVisible(true)} />
                <UserProfileAllContain />
                {renderProfileUpdateModal()}
            </ImageBackground>
            </View>
        </View>
    );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#8AE6CE',
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
    backgroundImage: {
        width: '100%',
        height: '60%',
        resizeMode: 'contain',
    },
    imageContainer: {
        alignSelf: 'center',
        marginTop: '10%',
        position: 'relative',
        width: scale(164),
        height: scale(167),
    },
    groupIcons: {
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        borderRadius: scale(100),
    },
    solarcameraIcons: {
        width: scale(48),
        height: scale(48),
        resizeMode: 'contain',
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    name: {
        fontSize: scale(24),
        fontWeight: '800',
        alignSelf: 'center',
        color: '#00604D',
        marginTop: scale(15),
    },
    email: {
        fontSize: scale(14),
        fontWeight: '500',
        alignSelf: 'center',
        color: '#589288F7',
        marginTop: scale(10),
    },
    personalBox: {
        width: '100%',
        borderColor: '#FFFF',
        borderWidth: scale(2),
        marginTop: '10%',
        borderRadius: scale(15),
        backgroundColor: '#C5F1E7',
    },
    mainBodyHeader: {
        marginHorizontal: scale(25),
    },
    profileIcon: {
        width: scale(20),
        height: scale(20),
        resizeMode: 'contain',
        marginRight: '6%',
        marginLeft: '12%',
    },
    menuText: {
        fontSize: scale(18),
        color: '#00604D',
        fontWeight: '500',
    },
    menuItem: {
        paddingVertical: scale(15),
        borderBottomWidth: scale(0.8),
        borderBottomColor: '#7EABA2C4',
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemLast: {
        paddingVertical: scale(15),
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteButton: {
        width: '100%',
        height: scale(52),
        borderColor: '#FF9999',
        borderWidth: scale(2),
        marginTop: '10%',
        borderRadius: scale(15),
        backgroundColor: '#FFCCCC',
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteText: {
        color: '#D80004',
        fontSize: scale(16),
        fontWeight: '500',
    },
    logOutButton: {
        width: '100%',
        height: scale(52),
        borderColor: '#FFFF',
        borderWidth: scale(2),
        marginTop: '3%',
        borderRadius: scale(15),
        backgroundColor: '#C5F1E7',
        flexDirection: 'row',
        alignItems: 'center',
    },

    // Modal Styles
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'flex-end',
    },
    modalBox: {
        backgroundColor: 'white',
        borderTopLeftRadius: scale(30),
        borderTopRightRadius: scale(30),
        paddingHorizontal: scale(24),
        paddingTop: scale(40),
        paddingBottom: scale(20),
        alignItems: 'center',
    },
    thumbCircle: {
        backgroundColor: '#08A48B',
        width: scale(100),
        height: scale(100),
        borderRadius: scale(50),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: scale(20),
    },
    thumbImage: {
        width: scale(79),
        height: scale(79),
        resizeMode: 'contain',
    },
    wooHooText: {
        fontSize: scale(21),
        fontWeight: '700',
        color: '#00604D',
        marginBottom: scale(10),
    },
    successMessage: {
        fontSize: scale(14),
        color: '#00604D',
        textAlign: 'center',
        fontWeight: "500",
        marginBottom: scale(25),
        width: "60%",
    },
    doneButton: {
        backgroundColor: '#00604D',
        borderRadius: scale(24),
        width: scale(194),
        height: scale(50),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: scale(30)
    },
    doneButtonText: {
        color: 'white',
        fontSize: scale(16),
        fontWeight: '600',
    },
      backButton: {
            width: scale(24),
            height: scale(24),
            resizeMode: "contain",
            marginTop:scale(25),
            marginLeft:scale(25)
        },
});

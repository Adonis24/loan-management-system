<View style={styles.container}>
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ alignItems: 'flex-end' }}>
            <Image source={require('../assets/images/topRight.png')} style={{ width: 140, height: 130 }} resizeMode={'contain'} />
        </View>
        {/* <View style={{ alignItems: 'flex-start' }}>
                        <Image source={require('../assets/images/bottomLeft.png')} style={{ width: 79, height: 143 }} resizeMode={'contain'} />
                    </View> */}
    </View>
    <View style={{ position: 'absolute', top: Constants.statusBarHeight, left: 0, bottom: 0, right: 0, }}>
        {/* HEADER */}
        <View style={{ flex: 6, backgroundColor: 'blue' }}>
            <Image source={{ uri: profile_pic }} style={{ flex: 1, width: undefined, height: undefined }} resizeMode={'cover'} />
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>TEST</Text></View>

            {/* <LinearGradient
                        colors={['#4c669f', '#3b5998', '#192f6a']}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', border: 1, borderColor: '#000' }}>
                                <TouchableOpacity onPress={() => props.navigation.goBack()} >
                                    <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'ios-arrow-back'} size={32} color={'#fff'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', padding: 5 }}>
                            <Image source={{ uri: profile_pic }} style={[{ height: Layout.window.width / 3, width: Layout.window.width / 3, borderRadius: Layout.window.width/ 6, borderWidth: 1, borderColor: '#fff', marginBottom: 5 }]} resizeMode={'cover'} />
                            <Text style={[styles.textDefault, { color: '#fff' }]}>{capitalizeString(name)}</Text>
                            <Text style={[styles.textDefault, { color: '#fff' }]}>{companyName}</Text>
                        </View>
                    </LinearGradient> */}
        </View>
        {/* CONTENT AREA */}
        <View style={{ flex: 9 }}>
            <ScrollView >
                {/* PERSONAL PROFILE */}
                <View style={{ flex: 3, margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Personal</Text>
                            <Ionicons name={'md-more'} size={24} color={'#2C4690'} />
                        </View>
                    </View>
                    <View style={[{ backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', justifyContent: 'space-between', }]}>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.label]}>Name :</Text></View>
                            <View style={{ flex: 2 }}><Text style={[styles.answer]}>{name}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.label, { alignSelf: 'flex-start', textAlign: 'left' }]}>Email :</Text></View>
                            <View style={{ flex: 2, flexDirection: 'row' }}>
                                <Text style={[styles.answer]}>{email}</Text><TouchableOpacity >
                                    {email_verified_at ? <Ionicons name={'md-checkmark-circle'} color={'green'} size={20} style={{ marginLeft: 3 }} /> : <Text style={[styles.caption, { padding: 3, margin: 3, }]}>Verify</Text>}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.label]}>Phone :</Text></View>
                            <View style={{ flex: 2 }}>
                                {phone_no ? <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.answer]}>{phone_no}</Text>
                                    <Ionicons name={'md-checkmark-circle'} color={'green'} size={20} style={{ marginLeft: 3 }} />
                                </View> :
                                    <TouchableOpacity onPress={() => props.navigation.navigate('SignUpOtp', { screen: 'setting' })} style={{ borderRadius: 5 }}>
                                        <Text style={[styles.caption, { padding: 5 }]}>Add Phone</Text>
                                    </TouchableOpacity>}
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.label]}>IC :</Text></View>
                            <View style={{ flex: 2 }}><Text style={[styles.answer]}>{ic_no}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.label]}>Membership:</Text></View>
                            <View style={{ flex: 2 }}><Text style={[styles.answer]}>{member_id}</Text></View>
                        </View>
                    </View>
                </View>
                {/* END PERSONAL PROFILE --- START COMPANY */}
                <View style={{ flex: 3, margin: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'rgba(0,51,102,0.3)', borderStyle: 'solid' }}>
                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode={'tail'}>Company</Text>
                            <Ionicons name={'md-more'} size={24} color={'#2C4690'} />
                        </View>
                    </View>
                    <View style={[{ backgroundColor: '#fff', flex: 1, alignSelf: 'stretch', justifyContent: 'space-between', }]}>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.label]}>Name :</Text></View>
                            <View style={{ flex: 2 }}><Text style={[styles.answer]}>{companyName}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.label]}>SSM :</Text></View>
                            <View style={{ flex: 2 }}><Text style={[styles.answer]}>{companyRegNo || '123456789'}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.label]}>Established :</Text></View>
                            <View style={{ flex: 2 }}><Text style={[styles.answer]}>{moment(reg_date).fromNow()}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.label]}>Activities :</Text></View>
                            <View style={{ flex: 2 }}><Text style={[styles.answer]}>{main_biz_act}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.label]}>Status :</Text></View>
                            <View style={{ flex: 2 }}><Text style={[styles.answer]}>{basic_status}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.label]}>Email :</Text></View>
                            <View style={{ flex: 2 }}><Text style={[styles.answer]}>{companyEmail}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.label]}>Phone :</Text></View>
                            <View style={{ flex: 2 }}><Text style={[styles.answer]}>{companyPhone}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 1 }}><Text style={[styles.label]}>Address :</Text></View>
                            <View style={{ flex: 2 }}>
                                <Text style={[styles.answer]}>{addr}</Text>
                                <Text style={[styles.answer]}>{addr_2}</Text>
                                <Text style={[styles.answer]}>{postcode}</Text>
                                <Text style={[styles.answer]}>{city}</Text>
                                <Text style={[styles.answer]}>{state}</Text>
                            </View>
                        </View>



                    </View>
                </View>

            </ScrollView>
        </View>
    </View>
</View >
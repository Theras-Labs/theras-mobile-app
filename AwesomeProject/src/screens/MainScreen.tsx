import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import {NodeMediaClient} from 'react-native-nodemediaclient';
// todo: refresh, on 10sec?
// push to view videos

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ],
      {
        title: 'Theras App Camera And Microphone Permission',
        message:
          'Theras App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
export default function MainScreen(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    //   async function testLoad() {
    //     const user = await firestore()
    //       .collection('users')
    //       .doc('HjJawmX4pOuEp8e2i0yQ')
    //       .get();
    //     console.log(user, 'RESULT');
    //   }
    //   testLoad();

    requestCameraPermission();
    NodeMediaClient.setLicense(
      'ZjJhNTIzODAtNGU0ZDUzMjEtY24ubm9kZW1lZGlhLmlTaG93Uk4=-syY8+2t7utLZAKLDs1SaD0EOPC9ft3Zq2SncV7gvMg1vnuEGf6QYMDpiSWj0A7xLhbn62BJHJvi1sGLPKgRflHnT6ysuUfQM7W8fgMA75gbqSCMu4vVqssX+yWCeEIbb5uJ/WHYjSvjSOa0W69TwHB5OSxf0bgAMFo8oJjiSCG16CKRuCHeNQBF8KRh+PYuRDnd3pBmnvE8QyWMDpvtEJd1fSYrGLdwgeO8F4gBKoeXyk2/rpEHKDmm/MKAlHli0/mpz8ejlL6ifAw6rB0TqXfpUMuo6vXpx0bjV7G5wxnOMB5pubn91UWrpRoUhPjadOFiket1DmqPsZFiQGnv0iA==',
    );
  }, []);
  useEffect(() => {
    async function loadLiveStream() {
      try {
        const response = await axios.get(
          'https://api.thetavideoapi.com/service_account/srvacc_wsc6ub2wcd272zim0wx01i3sv/streams',
          {
            headers: {
              'x-tva-sa-id': 'srvacc_wsc6ub2wcd272zim0wx01i3sv',
              'x-tva-sa-secret': 'xvfk7zekzd5vu14qc6whssv58bczsj10',
              'Content-Type': 'application/json',
            },
          },
        );

        // Handle the response data
        console.log(response.data);
        setData(response.data?.body?.streams?.filter(o => o?.status === 'on'));
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    }
    loadLiveStream();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.text}>Theras BETA app</Text>

        {/* Add your scrollable content here */}
        {!!data?.length &&
          data
            // ?.filter(o => o?.status === 'on')
            .map((item, i) => (
              <View
                // onPress  //push
                key={i}
                style={{
                  width: '100%',
                  backgroundColor: 'green',
                  marginBottom: 10,
                }}>
                <View
                  style={{width: '100%', height: 200, backgroundColor: 'gray'}}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 5,
                  }}>
                  <Text>Live </Text>
                  {/* <Text>Viewers: X</Text> */}
                </View>
              </View>
            ))}
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton} onPress={handleOpenModal}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <ModalCreateStream
        {...{
          modalVisible,
          handleCloseModal,
          data,
          //   data ON
          onNavigate: (id, key) => {
            props?.navigation.navigate('Push', {
              pushserver: id,
              stream: key,
            });
            setModalVisible(false);
          },
        }}
      />
    </View>
  );
}

const ModalCreateStream = ({
  handleCloseModal,
  modalVisible,
  onNavigate,
  data,
}: any) => {
  const [inputValue, setInputValue] = useState('');
  const [inputValueKEY, setInputValueKEY] = useState('');

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Button
            disabled={data?.length === 3}
            title={`Live Stream API ${data?.length}/3`}
            onPress={() => {
              if (data?.length !== 3) {
                const x = selectNewData(STREAM_KEY, data);
                onNavigate(x?.backup_stream_server, x?.backup_stream_key);
                console.log(x?.backup_stream_server, x?.backup_stream_key);
              }
            }}
          />

          <Text
            style={{marginVertical: 5, textAlign: 'center', color: 'white'}}>
            or
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Stream id"
            onChangeText={t => setInputValue(t)}
            placeholderTextColor={'white'}
          />
          <TextInput
            style={styles.input}
            placeholder="Stream key"
            onChangeText={t => setInputValueKEY(t)}
            placeholderTextColor={'white'}
          />
          <Button
            title="Submit"
            onPress={() => {
              onNavigate(inputValue, inputValueKEY);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'gray',
    backgroundColor: '#0A192F',
  },
  scrollViewContent: {
    padding: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#64FFDB',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#64FFDB',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    fontSize: 24,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#172A46',
    padding: 16,
    borderRadius: 5,
    elevation: 5,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: 'white',
  },
});

function selectNewData(FULL_LIST, EXIST_LIVE) {
  for (let i = 0; i < FULL_LIST.length; i++) {
    const newData = FULL_LIST[i];
    const newDataId = newData.id;
    let found = false;

    for (let j = 0; j < EXIST_LIVE.length; j++) {
      const existingData = EXIST_LIVE[j];
      const existingDataId = existingData.id;

      if (newDataId === existingDataId) {
        found = true;
        break;
      }
    }

    if (!found) {
      return newData;
    }
  }

  return null; // If no new data is found
}

const STREAM_KEY = [
  {
    model: 'streams',
    models: {
      service_account_id: 'service_accounts',
    },
    id: 'stream_4qef6ac1ctyy4p95x250qtvd6',
    service_account_id: 'srvacc_wsc6ub2wcd272zim0wx01i3sv',
    name: 'test-1',
    location: 'us-west1',
    assigned_distribution_id: 'dist_tij2qwe0wipcyue9gjbhu7d71d5',
    assigned_distribution_location: 'us_central',
    assigned_ingestor_name: 'w-us-central1-230601071107407',
    assigned_ingestor_zone: 'projects/710290090926/zones/us-central1-a',
    received_fps: 0,
    received_width: 720,
    received_height: 1280,
    received_profile: 100,
    received_level: 31,
    resolutions: ['160p', '240p', '360p', '720p', 'source'],
    source_resolution: null,
    fps: null,
    use_drm: false,
    status: 'on',
    update_time: '2023-06-01T19:29:52.436Z',
    playback_url:
      'https://live5.thetavideoapi.com/hls/live/2015904/hls_streamer_us_central_0049/playlist.m3u8',
    thumbnail_url:
      'https://storage.googleapis.com/thumbnails.thetavideoapi.com/thumbnail/stream_4qef6ac1ctyy4p95x250qtvd6/1684978117415.jpg',
    backup_stream_server: 'rtmp://live5in.thetavideoapi.com/live',
    backup_stream_key:
      'f4cbbd9764a6b89cecee16ad98751786291c0441f2cf36e404a9fdf6673b6e36f6ac051550a6255001767c5a0d8c1c8da952b781117fd097fb3a866c24b3012a975b2e795d003cd65cdd567642a3861752399e77fae33d92081e956ff25505daaa9bdf63ed5d832944ed590a846d8862',
  },
  {
    model: 'streams',
    models: {
      service_account_id: 'service_accounts',
    },
    id: 'stream_w6rkufhvszw624a7bekp7tbj7',
    service_account_id: 'srvacc_wsc6ub2wcd272zim0wx01i3sv',
    name: null,
    location: 'us-west1',
    assigned_distribution_id: 'dist_sy3di3fs276vsevtm3dnp55qbjm',
    assigned_distribution_location: 'us_central',
    assigned_ingestor_name: 'w-us-central1-230601195726319',
    assigned_ingestor_zone: 'projects/710290090926/zones/us-central1-a',
    received_fps: 30,
    received_width: 1920,
    received_height: 1088,
    received_profile: 100,
    received_level: 40,
    resolutions: ['160p', '240p', '360p', '720p', 'source'],
    source_resolution: null,
    fps: null,
    use_drm: false,

    update_time: '2023-06-01T20:40:58.869Z',
    playback_url:
      'https://live5.thetavideoapi.com/hls/live/2015942/hls_streamer_us_central_0083/playlist.m3u8',
    thumbnail_url: null,
    backup_stream_server: 'rtmp://live5in.thetavideoapi.com/live',
    backup_stream_key:
      'f4cbbd9764a6b89cecee16ad98751786291c0441f2cf36e404a9fdf6673b6e36f6ac051550a6255001767c5a0d8c1c8da952b781117fd097fb3a866c24b3012a86759906e44353f8a9a3a54098450dce92cab67f7c4a2d3b8fb380a3d31e12e2a3c5d3caaa33e96abae94ae7b9417e1f',
  },
  {
    model: 'streams',
    models: {
      service_account_id: 'service_accounts',
    },
    id: 'stream_dw8ijiegdcnxb644uy1ur0ax2',
    service_account_id: 'srvacc_wsc6ub2wcd272zim0wx01i3sv',
    name: '',
    location: 'us-west1',
    assigned_distribution_id: 'dist_u8ban8dcnphvkmvpxzcpzs8s6ae',
    assigned_distribution_location: 'us_central',
    assigned_ingestor_name: 'w-us-central1-230601201106637',
    assigned_ingestor_zone: 'projects/710290090926/zones/us-central1-a',
    received_fps: 30,
    received_width: 1920,
    received_height: 1088,
    received_profile: 100,
    received_level: 40,
    resolutions: ['160p', '240p', '360p', '720p', 'source'],
    source_resolution: null,
    fps: null,
    use_drm: false,
    update_time: '2023-06-01T20:43:53.769Z',
    playback_url:
      'https://live5.thetavideoapi.com/hls/live/2015872/hls_streamer_us_central_0017/playlist.m3u8',
    thumbnail_url:
      'https://storage.googleapis.com/thumbnails.thetavideoapi.com/thumbnail/stream_dw8ijiegdcnxb644uy1ur0ax2/1683387914063.jpg',
    backup_stream_server: 'rtmp://live5in.thetavideoapi.com/live',
    backup_stream_key:
      'f4cbbd9764a6b89cecee16ad98751786291c0441f2cf36e404a9fdf6673b6e36f6ac051550a6255001767c5a0d8c1c8da952b781117fd097fb3a866c24b3012ad81410ed8010a4b5f74111063a8bb91f84faf8b1113f3c23052878e069cdf4e8620f078b687cf1c8487c538a8435e2bf',
  },
];

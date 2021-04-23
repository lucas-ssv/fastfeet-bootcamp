import React, { useRef, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RNCamera } from 'react-native-camera';
import { useDispatch } from 'react-redux';

import { deliveryOrderSuccess } from '~/store/modules/user/actions';

import api from '~/services/api';

import {
    Container,
    GetPhoto,
    Background,
    ViewImage,
    ImagePreview,
    SubmitButton,
} from './styles';

export default function ConfirmDelivery({ navigation }) {
    const { order } = navigation.state.params;

    const dispatch = useDispatch();

    const camRef = useRef(null);
    const [photoUri, setPhotoUri] = useState(null);

    async function takePicture() {
        if (camRef) {
            const data = await camRef.current.takePictureAsync();
            setPhotoUri(data.uri);
        }
    }

    async function handleSubmit() {
        const data = new FormData();

        data.append('file', {
            type: 'image/jpeg',
            uri:
                Platform.OS === 'android'
                    ? photoUri
                    : photoUri.replace('file://', ''),
            name: `signature_${photoUri.split('-')}`,
        });

        const response = await api.post('files', data);

        const { id } = response.data;

        dispatch(deliveryOrderSuccess(id, order.id, order.deliveryman.id));
    }

    return (
        <Container>
            {!photoUri ? (
                <RNCamera
                    ref={camRef}
                    style={{ flex: 1, alignItems: 'center' }}
                    type={RNCamera.Constants.Type.back}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                >
                    <GetPhoto onPress={takePicture}>
                        <Icon name="camera-alt" size={30} color="#fff" />
                    </GetPhoto>
                </RNCamera>
            ) : (
                <>
                    <Background />

                    <ViewImage>
                        <ImagePreview source={{ uri: photoUri }} />
                        <SubmitButton onPress={handleSubmit}>
                            Enviar
                        </SubmitButton>
                    </ViewImage>
                </>
            )}
        </Container>
    );
}

ConfirmDelivery.navigationOptions = ({ navigation }) => ({
    title: 'Confirmar entrega',
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={25} color="#fff" />
        </TouchableOpacity>
    ),
});

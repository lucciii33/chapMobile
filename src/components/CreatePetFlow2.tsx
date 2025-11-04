import React, { useState } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import PetForm from './PetForm';
import TagForm from './TagForm';
import PaymentStep from './PaymentStep';

interface CreatePetFlowProps {
  visible: boolean;
  onClose: () => void;
}

interface StepsState {
  petInfo: boolean;
  tagInfo: boolean;
  paymentOrCart: boolean;
}

export default function CreatePetFlow({
  visible,
  onClose,
}: CreatePetFlowProps) {
  const [steps, setSteps] = useState<StepsState>({
    petInfo: true,
    tagInfo: false,
    paymentOrCart: false,
  });

  const [petData, setPetData] = useState<any>(null);
  const [tagData, setTagData] = useState<any>(null);

  const handlePetCreated = (data: any) => {
    setPetData(data);
    setSteps({ petInfo: false, tagInfo: true, paymentOrCart: false });
  };

  const handleTagCreated = (data: any) => {
    setTagData(data);
    setSteps({ petInfo: false, tagInfo: false, paymentOrCart: true });
  };

  const handleFinish = () => {
    setSteps({ petInfo: true, tagInfo: false, paymentOrCart: false });
    setPetData(null);
    setTagData(null);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {steps.petInfo && (
          <PetForm onSuccess={handlePetCreated} onCancel={onClose} />
        )}
        {steps.tagInfo && <TagForm onSuccess={handleTagCreated} />}
        {steps.paymentOrCart && <PaymentStep onFinish={handleFinish} />}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

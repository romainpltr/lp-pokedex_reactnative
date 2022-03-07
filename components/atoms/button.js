
import { StyleSheet, Image, Button } from 'react-native';
import { useState } from 'react';

export default function btn(props) {
  const { btnTitle, accessibilityLabel, color, onClick } = props;
  const [displayImage, setDisplayImage] = useState(false);
  return (
    <>
        <Button
            style={styles.container} 
            title={ btnTitle }
            color={ color }
            onPress={ () => { onClick(color); setDisplayImage(!displayImage) } }
            accessibilityLabel={ accessibilityLabel ? accessibilityLabel : btnTitle }
        />
        { displayImage && 
            <Image 
                source={ require('../../assets/giflol.gif') }
                style = {{ width: 400, height: 200 }}    
            />
        }
     </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

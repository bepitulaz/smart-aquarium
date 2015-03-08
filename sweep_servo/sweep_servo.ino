#include <Servo.h>

Servo mServo;
int iPos = 0;
String sMessage;

void setup() {
  Serial.begin(9600);
  mServo.attach(9); // attach servo to pin 9
}

/**
  Sweep the servo 180 degrees when
 */
void startServo() {
  for(iPos = 0; iPos < 180; iPos += 1) {
    mServo.write(iPos);
    delay(15);
  }
  
  for(iPos = 180; iPos >= 1; iPos -= 1) {
    mServo.write(iPos);
    delay(15);
  }
  
  Serial.println("done\n");
}

void loop() {
  // wait the command to start the servo from the host machine
  if(Serial.available() > 0) {
    // read the incoming byte
    sMessage = Serial.readString();
    
    Serial.println(sMessage);
    // if arduino receive "feed" command
    if(sMessage == "feed\n") {
      startServo();
    } else {
      Serial.println("not feeding now\n");
    }
  }
}

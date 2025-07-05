'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, Trophy, BookOpen } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const questions = [
  {
    id: 1,
    question: 'Ang ibig sabihin ng kumikislap na dilaw na ilaw ay:',
    options: [
      'mayroon kang right of way kapag kumikislap ang pulang ilaw',
      'magmabagal at pagpatuloy sa sangandaan na may pag-iingat',
      'ang mga sasakyan ay tumutigil mula sa kabila',
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Ang kumikislap na dilaw na ilaw ay nangangahulugang dapat magmabagal at magpatuloy sa sangandaan na may pag-iingat.',
  },
  {
    id: 2,
    question: 'Mandatory na dalhin ng mga driver ng kotse, anong uri ng seguro (insurance)?',
    options: ['Komprehensibo', 'Third-party', 'Lahat ng nabanggit'],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Ang Third-party insurance ay mandatory na dalhin ng lahat ng mga driver ng kotse sa Pilipinas.',
  },
  {
    id: 3,
    question: 'Kapag pumaparada sa paahon na daan na walang bangketa, iliko ang iyong gulong:',
    options: [
      'kahanay / kahilera ng kalsada',
      'patungo sa gilid ng kalsada',
      'patungo sa gitna ng kalsada',
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Kapag pumaparada sa paahon na daan na walang bangketa, dapat iliko ang gulong patungo sa gilid ng kalsada para sa kaligtasan.',
  },
  {
    id: 4,
    question: 'Alin sa mga sumusunod ang paglabag sa senyas pantrapiko o traffic signals?',
    options: ['Ilegal na pagparada', 'Pagsakay o pagbaba', 'Beating the red light'],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Ang 'Beating the red light' ay paglabag sa traffic signals at napakadelikadong ginagawa na maaaring magdulot ng aksidente.",
  },
  {
    id: 5,
    question:
      'Ang sasakyan mo ay may hand-held telepono. Para magamit ito, ano ang iyong dapat gawin?',
    options: [
      'Gamitin habang nagpapatakbo ng maingat',
      'Bagalan ang iyong takbo',
      'Huminto muna saka ito gamitin',
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Para sa kaligtasan, dapat huminto muna ang sasakyan bago gamitin ang hand-held telepono. Bawal gamitin ito habang nagmamaneho.',
  },
  {
    id: 6,
    question: 'Aling senyas trapiko ang nangangahulugang "Bawal Pumasok"?',
    options: [
      'Asul na bilog na may pulang diagonal na linya (No Entry sign)',
      'Pulang bilog na may puting horizontal na bar (Do Not Enter sign)',
      'Asul na bilog na may pulang X (No Stopping sign)',
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Ang pulang bilog na may puting horizontal na bar ay ang standard na 'Bawal Pumasok' o 'Do Not Enter' sign sa traffic regulations.",
  },
  {
    id: 7,
    question: 'Ang mga traffic sign, traffic signal, mga babala, at pavement marking ay para sa:',
    options: ['motorist lamang', 'mga taong dumadaan lamang', 'lahat ng gumagamit ng kalsada'],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Ang mga traffic sign, traffic signal, mga babala, at pavement marking ay para sa lahat ng gumagamit ng kalsada - motorist, pedestrian, at iba pa.',
  },
  {
    id: 8,
    question: 'Kailan pwedeng gamitin ang unang lane (pinakakaliwa) ng three-lane expressway?',
    options: [
      'Kapag mabagal ang takbo kaysa sa itinakdang bilis at walang ibang sasakyan sa paligid',
      'Kapag tumatakbo ng higit sa mabilis kaysa itinakdang bilis',
      'Kapag nag-o-overtake',
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Ang pinakakaliwa na lane sa three-lane expressway ay ginagamit lamang para sa pag-overtake o pagdaan sa mas mabagal na sasakyan.',
  },
  {
    id: 9,
    question:
      'Ano ang dapat mong gawin kung sinadyang tinawid ng kasalubong na sasakyan ang gitnang daanan o lane upang lumusot o mag-overtake sa isa pang sasakyan?',
    options: [
      'Maging alerto at bagalan ang takbo o huminto kung kinakailangan',
      'Bumusina at pagbilihin ang bilis ng pagtakbo',
      'Pailawin ang head light',
    ],
    correctAnswer: 0, // Option A is correct
    explanation:
      'Kapag may kasalubong na sasakyan na tumatawid sa inyong lane, dapat maging alerto at magbagal o huminto para sa kaligtasan.',
  },
  {
    id: 10,
    question:
      'Nasa expressway ka at mayroong pulang kumikislap na ilaw sa taas ng bawat linya. Dapat kang:',
    options: ['magmaneho ng dahan-dahan', 'umalis sa susunod na labasan', 'huminto at maghintay'],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Ang pulang kumikislap na ilaw sa expressway ay nangangahulugang dapat huminto at maghintay hanggang sa maging safe na magpatuloy.',
  },
  {
    id: 11,
    question: 'Ang traffic sign na "Give Way" ay nangangahulugan na:',
    options: [
      'bagalan ang takbo at humanda sa paghinto at magbigay daan sa mga may karapatan sa daan na sasakyan at mga taong tatawid',
      'bagalan ang takbo kung kinakailangan',
      'tuluyang huminto',
    ],
    correctAnswer: 0, // Option A is correct
    explanation:
      "Ang 'Give Way' sign ay nangangahulugang dapat magbagal at magbigay daan sa mga may karapatan sa daan.",
  },
  {
    id: 12,
    question:
      'Tama ba na itutulag ng gravity ang iyong sasakyan nang pataas kapag nagmamaneho sa paakyat na daan sa bilis na 60 km/oras?',
    options: ['Mali', 'Tama', 'Kailangang bilisan pa'],
    correctAnswer: 0, // Option A is correct
    explanation:
      'Mali - ang gravity ay hindi makakatulong sa pag-akyat ng sasakyan. Sa paakyat na daan, kailangan ng mas malakas na power para makaakyat.',
  },
  {
    id: 13,
    question: 'Alin ang maaaring makapagpawala sa iyong konsentrasyon habang nagmamaneho?',
    options: [
      'Gamit ang panlinis ng iyong windscreen',
      'Pagtingin sa mga mapa ng daan, makinig sa malakas na kanta, pag-gamit ng mobile phone',
      'Pagtingin sa iyong side mirror',
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Ang pagtingin sa mga mapa, pakikinig sa malakas na musika, at paggamit ng mobile phone ay mga pangunahing sanhi ng pagkawala ng konsentrasyon habang nagmamaneho.',
  },
  {
    id: 14,
    question: 'Ano ang ibig sabihin ng senyas trapiko na ito?',
    options: ['Pook tawiran sa unahan', 'Pook paaralan', 'Bawal tumawid'],
    correctAnswer: 1, // Option B is correct - Pook paaralan
    explanation:
      'Ang yellow/green na bilog na may dalawang taong naglalakad (adult at bata) ay nagpapahiwatig ng pook paaralan o school zone.',
    image: 'https://res.cloudinary.com/dlax3esau/image/upload/v1751104158/Screenshot_4_qjuxac.png',
  },
  {
    id: 15,
    question:
      'Magpapatuloy ka ba sa mabilis mong takbo kung sa likuran mo ay may sasakyang pang-emergency na sumisirena at kumikislap ang ilaw kahit na may isa pang bukas na lane?',
    options: [
      'Oo, para hindi ka maabala',
      'Hindi, dapat magmaneho nang mabagal',
      'Depende sa abilidad ng driver',
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Kapag may emergency vehicle na may sirena at kumikislap na ilaw, dapat magbagal o magbigay daan kahit may ibang lane pa, para sa kaligtasan.',
  },
  {
    id: 16,
    question:
      'Kung may nakita kang bola mula sa likuran ng isang nakaparadang sasakyan sa isang kalye, malamang na may batang nakasunod dito. Ano ang gagawin mo?',
    options: [
      'Bilisan ang takbo',
      'Bagalan ang takbo',
      'Bumusina at panatilihin ang bilis ng takbo',
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Kapag nakakita ng bola mula sa likuran ng nakaparadang sasakyan, dapat magbagal dahil maaaring may batang tumatakbo para kunin ito.',
  },
  {
    id: 17,
    question:
      'Ano ang mga code ng DL o Restriction para sa lisensya sa pag-mamaneho ng hindi-propesyonal ng maliit na sasakyan?',
    options: ['1, 3 (A, A1, D)', '1, 2, 4, 6 (A, A1, B, B1, B2, BE)', '1, 5 (A, A1, CE)'],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Para sa hindi-propesyonal na maliit na sasakyan, ang mga code ay 1, 2, 4, 6 na tumutugma sa A, A1, B, B1, B2, at BE restrictions.',
  },
  {
    id: 18,
    question: 'Kapag papalapit sa pataas na tulay, dapat kang?',
    options: ['Magdahan-dahan', 'Biglang prumeno', 'Magmabilis'],
    correctAnswer: 0, // Option A is correct
    explanation:
      'Kapag papalapit sa pataas na tulay, dapat magdahan-dahan para sa kaligtasan at para makontrol ang sasakyan sa pag-akyat.',
  },
  {
    id: 19,
    question:
      'Sa aling lugar ka hindi dapat mag-overtake nang walang malinaw na nakikita kahit man lamang sa 200 talampakan sa unahan?',
    options: ['Bago ang kurbada', 'Sa loob ng koneksyon sa kalsada', 'Bago ang rotonda'],
    correctAnswer: 0, // Option A is correct
    explanation:
      'Hindi dapat mag-overtake bago ang kurbada dahil hindi makikita ang mga paparating na sasakyan sa kabilang direksyon.',
  },
  {
    id: 20,
    question: 'Ano ang mga epekto ng alak / droga?',
    options: [
      'Mas mabilis na reaksyon',
      'Walang gaanong control, kawalan ng kumpiyansa, at hindi pagsaalang-alang sa bilis ng pagmamaneho',
      'Higit na kamalayan sa panganib',
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Ang alak at droga ay nagiging sanhi ng walang gaanong control, kawalan ng kumpiyansa, at hindi pagsaalang-alang sa bilis ng pagmamaneho - lahat ng ito ay delikado sa pagmamaneho.',
  },
  {
    id: 21,
    question: 'Ang pinakamabisang gawin sa isang sasakyang tumutulok ay:',
    options: [
      'huwag siyang pansinin ngunit huwag siyang hayaang makalayo',
      'bagalan ang takbo at hayaan siyang lumampas',
      'bilisan at maging alisto sa pagpreno',
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Kapag may sasakyang tumutulok sa harapan, dapat bagalan ang takbo at hayaan siyang lumampas para sa kaligtasan ng lahat.',
  },
  {
    id: 22,
    question:
      'Habang lumilipat ng lane, kailangan mong sumenyas, suriin/tingnan ang iyong rear view at side mirror, at:',
    options: [
      'pailawin ang head light ng sasakyan',
      'tingnan ang paparating na mga sasakyan',
      'bumusina',
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Sa paglipat ng lane, bukod sa pagsesignal at pagtingin sa mirrors, kailangan ding tingnan ang paparating na mga sasakyan para sa kumpletong kaligtasan.',
  },
  {
    id: 23,
    question: 'Ang Speedometer ay para sa bilis, samantalang ang Odometer ay para sa:',
    options: ['rebolusyon kada minuto', 'layo ng nilakbay', 'temperature'],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Ang Speedometer ay nagsusukat ng bilis ng sasakyan, habang ang Odometer ay nagsusukat ng kabuuang layo na nilakbay ng sasakyan.',
  },
  {
    id: 24,
    question: 'Ano ang ibig sabihin ng mga senyas trapiko na ito?',
    options: ['Daanan / riles ng tren', 'May shrine sa unahan', 'Bawal tumawid'],
    correctAnswer: 0, // Option A is correct
    explanation:
      'Ang mga triangular signs na may railway tracks at cross symbols ay nagpapahiwatig ng railway crossing o daanan ng tren. Dapat maging maingat sa mga lugar na ito.',
    images: [
      'https://res.cloudinary.com/dlax3esau/image/upload/v1751106099/Screenshot_6_nifreh.png',
      'https://res.cloudinary.com/dlax3esau/image/upload/v1751106099/Screenshot_5_zveqgz.png',
    ],
  },
  {
    id: 25,
    question:
      'Alin sa mga sumusunod na sasakyan ang maaaring gumamit ng kumikislap na asul na ilaw?',
    options: ['Expressway maintenance', 'Sasakyan na bomb disposal', 'Patrol ng pulisya'],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Ang kumikislap na asul na ilaw ay ginagamit lamang ng mga patrol ng pulisya at iba pang law enforcement vehicles para sa emergency situations.',
  },
  {
    id: 26,
    question:
      'Ano ang gagawin mo kapag nagreseta ang iyong doctor ng gamot na maaaring nakaapekto sa iyong pagmamaneho?',
    options: [
      'Iwasang magmaneho sa mga expressway',
      'Magmaneho lamang kung ikaw ay may kasama',
      'Huwag magmaneho',
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Kapag may ininom na gamot na maaaring makaapekto sa inyong kakayahan sa pagmamaneho, dapat huwag magmaneho para sa kaligtasan ng lahat.',
  },
  {
    id: 27,
    question: 'Bago lumiko, kailangan mo bang paraanin ang mga taong naglalakad?',
    options: [
      'Oo, dapat paraanin ng driver ang mga taong naglalakad',
      'Oo, kung ito ay liliko pakanan lamang',
      'Oo, kung ito ay liliko pakaliwa lamang',
    ],
    correctAnswer: 0, // Option A is correct
    explanation:
      'Bago lumiko, dapat palaging paraanin ang mga pedestrian dahil sila ay may karapatan sa daan at para sa kanilang kaligtasan.',
  },
  {
    id: 28,
    question:
      "Sa automatic na clutch, gamitin ang kambyo na 'Park' kapag ipaparada ang iyong sasakyan na nakaharap sa palusong na daan. Anong kambyo ang dapat mong gamitin sa manual na clutch?",
    options: [
      'Iwanan ang sasakyan nang naka-neutral',
      'Iwanan ang sasakyan na nakakambyo sa primera',
      'Iwanan ang sasakyan na naka-reverse',
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Sa manual transmission, kapag nakaharap sa palusong na daan, dapat iwanan ang sasakyan na naka-reverse gear para hindi ito gumulong pababa.',
  },
  {
    id: 29,
    question: 'Ang mga driver na higit na mabagal sa iba ay dapat nasa:',
    options: [
      'daanan o lane sa gawing labas',
      'gitnang daanan o lane',
      'gawing loob o daanan o lane',
    ],
    correctAnswer: 0, // Option A is correct
    explanation:
      'Ang mga mabagal na driver ay dapat nasa gawing labas o rightmost lane para hindi makaabala sa daloy ng trapiko.',
  },
  {
    id: 30,
    question:
      'Kapag nasa kalsada, kailan mo pwedeng iwanang nakabukas ang makina ng iyong sasakyan?',
    options: [
      'Kapag nasa 40 kph na lugar',
      'Kapag paparada na hindi lalagpas sa 5 minuto',
      'Hindi maaari kahit sa anumang sitwasyon',
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Hindi dapat iwanang nakabukas ang makina ng sasakyan kahit sa anumang sitwasyon dahil ito ay nagdudulot ng polusyon at aksidente.',
  },
  {
    id: 31,
    question: 'Babala ang signal na ito para sa panganib sa unahan:',
    options: ['umiindap na dilaw na ilaw', 'umiindap na pulang ilaw', 'umiindap na berdeng ilaw'],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Ang umiindap na pulang ilaw ay nagbabala ng panganib sa unahan at dapat maging maingat ang mga driver.',
  },
  {
    id: 32,
    question:
      'Kapag ang motorista ay nag-flash ng kanilang head light sa iyo, ang ibig sabihin nito:',
    options: [
      'na sila ay nagbibigay daan sa iyo',
      'na may isang radar speed trap sa unahan',
      'na binabalaan ka nila ng kanilang presensya',
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Ang pag-flash ng headlight ay karaniwang ginagamit para magbigay babala sa iba pang driver tungkol sa kanilang presensya.',
  },
  {
    id: 33,
    question:
      'Alin sa mga ito, kung pinapayagan na mababa, ay maaaring makapag-dulot ng aksidente o pag-crush sa kalsada?',
    options: ['Lebel ng radiator coolant', 'Lebel ng radiator water', 'Lebel ng likido ng preno'],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Ang mababang lebel ng brake fluid ay napakadelikado dahil maaaring mawalan ng preno ang sasakyan at magdulot ng aksidente.',
  },
  {
    id: 34,
    question: 'Aling senyas trapiko ang nagsasaad ng regulasyon at pagbabawal?',
    options: [
      {
        type: 'image',
        src: 'https://res.cloudinary.com/dlax3esau/image/upload/v1751108440/Screenshot_9_dvxkkz.png',
        alt: 'Rectangular white sign with black border',
      },
      {
        type: 'image',
        src: 'https://res.cloudinary.com/dlax3esau/image/upload/v1751108440/Screenshot_8_yupmeb.png',
        alt: 'Red circular sign',
      },
      {
        type: 'image',
        src: 'https://res.cloudinary.com/dlax3esau/image/upload/v1751108440/Screenshot_7_ug3urq.png',
        alt: 'Rectangular white sign with brown corner',
      },
    ],
    correctAnswer: 1, // Option B is correct - Red circle indicates prohibition/regulation
    explanation:
      'Ang pulang bilog na senyas trapiko ay nagpapahiwatig ng regulasyon at pagbabawal. Ito ang standard na hugis para sa mga prohibition signs sa buong mundo.',
  },
  {
    id: 35,
    question:
      'Alin sa mga sumusunod na pagkakataon ang maaari mong gawin kapag tumatawid sa isang solid na dilaw na linya?',
    options: [
      'Pagliko sa driveway kung ligtas itong gawin',
      'Pagdaan sa highway',
      'Pag-U-turn na highway',
    ],
    correctAnswer: 0, // Option A is correct
    explanation:
      'Ang solid yellow line ay maaaring tawirin lamang kapag liliko sa driveway o private property, basta ligtas itong gawin at walang paparating na sasakyan.',
  },
  {
    id: 36,
    question: 'Paano mo linisin ang iyong accelerator, preno, at kable ng clutch?',
    options: [
      'Palaging hugasan ang kable ng sabon at tubig',
      'Palaging ibabad ang kable sa langis pang makina',
      'Palaging ibabad ang kable sa gasolina',
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Ang mga kable ng accelerator, preno, at clutch ay dapat ibabad sa engine oil para sa tamang lubrication at para maiwasan ang rust.',
  },
  {
    id: 37,
    question:
      'Nakakita ka ng school bus na nakaparada sa kabilang bahagi ng highway na nakabukas ang hazard warning na ilaw. Kailangan mo bang huminto?',
    options: [
      'Oo, kailangan mong huminto. Ngunit pwede ka ng tumuloy kung sa tingin mo ay ligtas na',
      'Oo, kailangan mong huminto hanggang sa mamatay ang hazard light at walang mga bata sa kalsada',
      'Hindi, ngunit kailangan mong magdahan-dahan',
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Sa highway na may divider, hindi kailangan huminto kapag ang school bus ay nasa kabilang side, pero dapat magdahan-dahan para sa kaligtasan.',
  },
  {
    id: 38,
    question:
      'Alin sa sumusunod na accessory ang ipinag-uutos na maipanatili sa magandang kondisyon?',
    options: ['Seat belt', 'Head light', 'Lahat ng nabanggit'],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Lahat ng nabanggit na accessories - seat belt, head light, at iba pa - ay dapat panatilihing nasa magandang kondisyon para sa kaligtasan ng driver at passengers.',
  },
  {
    id: 39,
    question: 'Paano ka dapat pumarada sa tabi ng sasakyan na may ganitong sticker?',
    options: [
      'Pumarada na nakasampa ang dalawang gulong sa bangketa',
      'Pumarada malapit sa kabilang gilid ng sasakyan',
      'Pumarada ngunit magbigay ng tamang puwang para sa wheelchair',
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Kapag may nakitang sasakyan na may wheelchair accessibility sticker, dapat magbigay ng sapat na puwang para sa wheelchair access at hindi hadlangan ang kanilang paggamit ng accessibility features.',
    image: '/images/39.png',
  },
  {
    id: 40,
    question:
      'Sa malinaw na pananaw na hindi bababa sa 200 talampakan, aling lugar ang hindi mo dapat overtake-an?',
    options: ['Sa paanan ng tulay', 'Sa sangandaan', 'Lahat ng nabanggit'],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Kahit may malinaw na pananaw na 200 talampakan, hindi dapat mag-overtake sa paanan ng tulay, sangandaan, at iba pang delikadong lugar dahil maaaring may mga hindi nakikitang panganib.',
  },
  {
    id: 41,
    question:
      'Ilang metro ang lampas na haba sa sasakyan ng kargada para lagyan ito ng pulang bandera?',
    options: ['Mahigit 0.5 metro', 'Mahigit 1.0 metro', 'Mahigit 1.5 metro'],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Kapag ang kargada ay lumalampas ng mahigit 1.0 metro sa haba ng sasakyan, kinakailangan itong markahan ng pulang bandera para sa kaligtasan ng ibang motorista.',
  },
  {
    id: 42,
    question: 'Nagmamaneho ka sa mabagal na pila ng trapiko. Bago magpalit ng linya dapat kang:',
    options: [
      'tumingin ng mga motoristang nangunguna sa trapiko',
      'bumusina',
      "magbigay ng signal ng braso na 'magal'",
    ],
    correctAnswer: 0, // Option A is correct
    explanation:
      'Sa mabagal na trapiko, bago magpalit ng linya dapat tingnan muna ang mga motoristang nangunguna para masiguro na ligtas ang paglipat at hindi makakaabala sa daloy ng trapiko.',
  },
  {
    id: 43,
    question: 'Alin sa mga sumusunod ang nakalarawan?',
    options: ['Baku-bakong kalsada', 'Madulas ang kalsada', 'Matarik ang kalsada'],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Ang triangular warning sign na may larawan ng sasakyang nag-skid ay nagpapahiwatig ng madulas na kalsada. Dapat maging maingat at magbagal ang mga driver sa ganitong kondisyon.',
    image: 'https://res.cloudinary.com/dlax3esau/image/upload/v1751111101/Screenshot_10_w68jei.png',
  },
  {
    id: 44,
    question:
      'Sa gabi, kapag papalapit sa isang kurbada o interseksyon na mahirap makita ang kasalubong, tiyaking:',
    options: [
      'patay ang head light upang makita ng mga kasalubong na sasakyan ang sasakyan mo',
      'pailawin ang head light upang malaman ng mga tao at mga makakasalubong na motorista na papalapit ka sa kurbada o interseksyon',
      'pailawin ang mga ilaw sa loob ng sasakyan upang makita ng mga makakasalubong ang iyong sasakyan',
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Sa gabi, kapag papalapit sa kurbada o interseksyon na mahirap makita ang kasalubong, dapat pailawin ang headlight para magbigay babala sa mga tao at motorista na may paparating na sasakyan.',
  },
  {
    id: 45,
    question: 'Kapag nakakita ka ng nakahintong sasakyan sa gilid ng kalsada, ano ang gagawin mo?',
    options: [
      'Bumusina ng malaman nila na ikaw ay dadaan',
      'Huminto at pagalitan ang driver',
      'Bagalan ang takbo at mag-ingat sa pagdaan',
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Kapag may nakahintong sasakyan sa gilid ng kalsada, dapat magbagal at mag-ingat sa pagdaan dahil maaaring may mga taong bumababa o sumasakay, o may emergency situation.',
  },
  {
    id: 46,
    question:
      'Nagmaneho ka hanggang sa isang interseksyon at nakita mo ang senyas na ito. Ano ang dapat mong gawin?',
    options: [
      'Mapanatili ang bilis dahil ang lahat ng trapiko sa unahan ay dapat magbigay sa iyo',
      'Dumating sa isang kumpletong paghinto at magpatuloy pagkatapos ng pagbibigay sa anumang mga naglalakad at trapiko',
      'Pabagalin at maghanda na magbigay sa anumang mga naglalakad at trapiko sa unahan',
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      "Ang red triangular 'Give Way' o 'Yield' sign ay nangangahulugang dapat magbagal at maghanda na magbigay daan sa mga pedestrian at iba pang sasakyan. Hindi kailangan ng kumpletong paghinto maliban kung kinakailangan para sa kaligtasan.",
    image: '/images/46.png',
  },
  {
    id: 47,
    question: 'Ang dalawahang highway na iyong pupuntahan ay makitid na daan. Dapat kang:',
    options: [
      'dumiretso agad at huwag alalahanin ang tungkol sa karapatan sa daan',
      'maghintay ng iba pang mga sasakyan at sundan ang mga ito',
      'maghintay hanggang sa wala nang sasakyan sa magkabilang direksyon',
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Kapag papasok sa makitid na daan mula sa dalawahang highway, dapat maghintay hanggang sa wala nang sasakyan mula sa magkabilang direksyon upang maiwasan ang aksidente at matiyak ang kaligtasan ng lahat.',
  },
  {
    id: 48,
    question: "Aling senyas trapiko ang nangangahulugang 'Two-Way'?",
    options: [
      {
        type: 'image',
        src: '/images/48-a.png',
        alt: 'Rectangular white sign with black border',
      },
      {
        type: 'image',
        src: '/images/48-b.png',
        alt: 'Red circular sign',
      },
      {
        type: 'image',
        src: '/images/48-c.png',
        alt: 'Rectangular white sign with brown corner',
      },
    ],
    correctAnswer: 1, // Option B is correct - Red circle indicates prohibition/regulation
    explanation: '',
  },
  {
    id: 49,
    question: 'Ang pag-inom ng kahit na gaano karaming alak ay maaaring:',
    options: [
      'makapagpabilis ng iyong reaksyon, makapagpapagaling ng koordinasyon ng iyong katawan, at makapagpahinga ng iyong isip',
      'makapagpabuti ng iyong kaalaman tungkol sa panganib at tungkol sa mga batas at regulasyong pantrapik',
      'makapagpabagal ng iyong reaksyon, makapagpahina ng iyong paghusga, at makapagbibigay ng hindi tunay na kumpiyansa sa sarili',
    ],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      "Ang pag-inom ng alak ay nagpapabagal ng reaksyon, nagpapahina ng paghusga, at nagbibigay ng maling kumpiyansa sa sarili, kaya't delikado ito sa pagmamaneho.",
  },
  {
    id: 50,
    question:
      'Kapag lumiko sa isang sangandaan, kailangan mo bang magbigay daan sa mga taong naglalakad?',
    options: [
      'Oo, ang driver na liliko sa kaliwa o kanan ay dapat magbigay daan sa taong naglalakad',
      'Oo, kapag paliko lamang sa kanan',
      'Oo, kapag paliko lamang sa kaliwa',
    ],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation:
      'Ang driver na liliko sa kaliwa o kanan ay palaging dapat magbigay daan sa mga pedestrian para sa kanilang kaligtasan.',
  },
  {
    id: 51,
    question: 'Ang isang solong buong dilaw na ilaw ay nangangahulugang:',
    options: [
      'pinahihintulutan ang pagdaan / pag-overtake',
      'pagdaan / pag-o-overtake ay hindi pwede',
      'pagdaan / pag-o-overtake ay maaaring gawin kahit kailan',
    ],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Ang isang solong buong dilaw na ilaw ay nangangahulugang hindi pinapayagan ang pagdaan o pag-overtake para sa kaligtasan.',
  },
  {
    id: 52,
    question:
      'Lumapit ka sa isang kantong hindi gumagana ang mga ilaw ng trapiko, isang traffic enforcer ang nagbigay ng signal na ito. Dapat mong:',
    image: '/images/52.png',
    options: [
      'huminto sa linya ng paghinto',
      'iiwan lang',
      'itigil ang antas sa braso ng nakakasakit',
    ],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation:
      'Kapag ang traffic enforcer ay nagbigay ng signal na huminto, dapat kang huminto sa linya ng paghinto para sumunod sa batas trapiko.',
  },
  {
    id: 53,
    question: 'Ito ay traffic sign na octagonal ang hugis:',
    options: ['paradahan', 'lugar ng sakayan at babaan', 'babala ng pagtigil'],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation: "Ang octagonal na traffic sign ay nangangahulugang 'STOP' o babala ng pagtigil.",
  },
  {
    id: 54,
    question: 'Ano ang ibig sabihin ng senyas trapiko na ito?',
    image: '/images/54.png',
    options: [
      'Paisa-isang sasakyan lamang ang maaaring dumaan',
      'Bawal pumasok lahat ng klase ng sasakyan',
      'Dumiretso sa unahan at lumiko sa interseksyon',
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Ang senyas na ito ay nangangahulugang 'No Entry' o bawal pumasok ang lahat ng klase ng sasakyan.",
  },
  {
    id: 55,
    question:
      'Ayon sa R.A. 4136, alin sa mga sumusunod ang maksimum na nararapat na bilis sa mga malawak na pambansang kalsada?',
    options: ['80 km/oras', '100 km/oras', '60 km/oras'],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation:
      'Ayon sa R.A. 4136, ang maksimum na bilis sa malawak na pambansang kalsada ay 80 km/oras.',
  },
  {
    id: 56,
    question: 'Sino ang pangunahing may karapatan sa daan?',
    options: [
      'Truck ng bumbero na may ilaw at sirena na papunta sa emergency',
      'Malalaking bus',
      'Articulated truck',
    ],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation:
      'Ang mga emergency vehicles tulad ng truck ng bumbero na may ilaw at sirena ay may pangunahing karapatan sa daan.',
  },
  {
    id: 57,
    question:
      'Ano ang kailangan mong gawin kung masundan mo ang truck na may ganitong kumukurap-kurap na senyas sa kaniyang likuran?',
    image: '/images/57.png',
    options: ['Magmaneho papalayo sa truck', 'Dumaan sa kanang linya', 'Dumaan sa kaliwang linya'],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Kapag nakita mo ang senyas na ito sa likod ng truck, dapat kang dumaan sa kaliwang linya.',
  },
  {
    id: 58,
    question:
      'Ang Premium na gasolina ay nagbibigay ng higit na kakayahan ngunit maaaring magresulta sa:',
    options: ['sobrang pagkonsumo ng langis', 'labis na pag-init', 'dumudulas na clutch'],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Ang paggamit ng premium na gasolina na hindi angkop ay maaaring magdulot ng labis na pag-init ng makina.',
  },
  {
    id: 59,
    question:
      'Sa ilalim ng batas, ano ang iba pang sanhi na maaaring makaapekto sa iyong kalagayan sa pagmamaneho maliban sa mga inuming nakalalasing?',
    options: [
      'Kumakain habang nagmamaneho',
      'Mapanganib na ilegal na droga',
      'Pakikinig sa malakas na musika',
    ],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Ang paggamit ng mapanganib na ilegal na droga ay maaaring makaapekto sa iyong kakayahan sa pagmamaneho at labag sa batas.',
  },
  {
    id: 60,
    question: 'Ano ang maipapayo mo sa driver na nakainom nang konti sa party?',
    options: [
      'Uminom ng matapang na kape at pagkatapos magmaneho pauwi',
      'Magpahinga at huwag magmaneho',
      'Magmaneho nang mabagal at maingat pauwi',
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Ang tamang payo sa driver na nakainom ay magpahinga at huwag magmaneho upang maiwasan ang aksidente at mapanatili ang kaligtasan.',
  },
  {
    id: 61,
    question:
      'Anong kulay ng bandera ang kailangang ilagay para ipakita ang kargada na lumampas sa sasakyan?',
    options: ['Dilaw', 'Berde', 'Pula'],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Ang pulang bandera ay kailangang ilagay para ipakita ang kargada na lumampas sa sasakyan, bilang babala sa ibang motorista.',
  },
  {
    id: 62,
    question: 'Alin sa mga sumusunod ang nakalarawan?',
    options: ['Matarik ang kalsada', 'Sirang kalsada', 'Ilog'],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Ang larawan ay nagpapakita ng babala na may ilog o tubig sa dulo ng kalsada. Mag-ingat sa ganitong lugar.',
    image: '/images/62.png', // Replace with actual image path
  },
  {
    id: 63,
    question: 'Kung itinuturo ng driver sa harapan mo ang kaliwang kamay nang pataas, siya ay:',
    options: ['liliko pakanan', 'liliko pakaliwa', 'hihinto'],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation:
      'Kapag ang kaliwang kamay ng driver ay nakataas, ito ay senyas na siya ay liliko pakanan.',
  },
  {
    id: 64,
    question:
      'Ito ang tawag sa patuloy na daloy ng hangin na kailangan upang maka-iwas ang drayber na makalanghap ng masamang amoy upang hindi ito mahilo.',
    options: ['Paglanghap ng hangin', 'Bentilasyon ng hangin', 'Exhaust air'],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Ang bentilasyon ng hangin ay mahalaga upang maiwasan ng drayber ang paglanghap ng masamang amoy at hindi mahilo habang nagmamaneho.',
  },
  {
    id: 65,
    question: 'Sa linya ng paghinto bago ang tawiran ng mga tao, ang driver ay inaasahang:',
    options: ['magpatuloy', 'huminto', 'umapak sa preno'],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Ang tamang gawin ng driver ay huminto sa linya ng paghinto bago ang pedestrian lane upang magbigay daan sa mga tumatawid.',
  },
  {
    id: 66,
    question: 'Kailan mo maaaring gamitin ang iyong telephono habang nagmamaneho?',
    options: [
      'Kapag emergency ang pagtawag',
      'Kapag tatanggap ng tawag',
      'Kapag nagmamaneho ng automatic na sasakyan',
    ],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation:
      'Tanging sa emergency lamang pinapayagan ang paggamit ng telepono habang nagmamaneho upang maiwasan ang disgrasya.',
  },
  {
    id: 67,
    question: 'Paano ka dapat tumingin sa side mirror at rear view mirror habang nagmamaneho?',
    options: [
      'Tumingin nang matagal sa iyong salamin',
      'Mabilis na pagsulyap',
      'Hindi bababa sa isang beses kada minuto',
    ],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Ang mabilis na pagsulyap sa mga salamin ay mahalaga upang manatiling alerto sa paligid nang hindi nawawala ang atensyon sa kalsada.',
  },
  {
    id: 68,
    question:
      'Alin sa mga sumusunod ang hindi lamang delikado kung hindi ilegal din na gawin habang nagmamaneho?',
    options: [
      'Ang pagtetext o pagtawag habang nagmamaneho',
      'Pag-aayos ng iyong mga salamin sa labas',
      'Pakikinig ng musika',
    ],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation:
      'Ang pagtetext o pagtawag habang nagmamaneho ay parehong delikado at ilegal ayon sa batas trapiko.',
  },
  {
    id: 69,
    question:
      'Ang maramihang linya ng paglalakbay sa parehong direksyon ay nahahati ng anong kulay na linya sa daan?',
    options: ['Orange', 'Pula', 'Puti'],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Ang puting linya ang naghahati sa mga lane na may parehong direksyon ng paglalakbay.',
  },
  {
    id: 70,
    question: 'Saan ka pwedeng mag-overtake sa one-way na kalye?',
    options: [
      'Sa kaliwang bahagi lamang',
      'Alin man sa kaliwa o kanan',
      'Hindi pwedeng mag-overtake',
    ],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Sa one-way na kalye, maaaring mag-overtake alinman sa kaliwa o kanan depende sa sitwasyon at kaligtasan.',
  },
  {
    id: 71,
    question: 'Alin sa mga sumusunod ang katotohanan tungkol sa mga seat belt?',
    options: [
      'Ang driver lang ang dapat magsuot ng seat belt',
      'Ang pasahero sa harapan lamang ang dapat na magsuot ng seat belt',
      'Ang lahat ng mga upuang may seat belt ay dapat gamitin nang maayos',
    ],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Lahat ng nakaupo sa mga upuang may seat belt ay dapat magsuot nito nang maayos para sa kaligtasan ng lahat ng sakay ng sasakyan.',
  },
  {
    id: 72,
    question: 'Saan mo makikita ang senyas trapiko na ito?',
    options: ['Bago makarating sa tulay', 'Bago magpalit ng linya', 'Sa haligi ng tulay tawiran'],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Ang senyas na ito ay makikita sa haligi ng tulay tawiran bilang gabay at babala sa mga motorista upang maiwasan ang banggaan sa mga haligi ng tulay.',
    image: '/images/72.png', // Replace with actual image path
  },
  {
    id: 73,
    question: 'Ano pa ang maaaring makaapekto ng matindi sa iyong konsentrasyon bukod sa alak?',
    options: [
      'Ilaw ng trapiko, komportableng upuan, mahusay na disenyo ng kalsada',
      'Mga droga, pagod at malakas na kanta, mga billboard, tinted na bintana',
      'Nakapapawing pagod na musika, maayos na ilaw sa kalye, mga markahan ng semento',
    ],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Bukod sa alak, ang mga droga, pagod, malakas na kanta, billboard, at tinted na bintana ay maaaring makaapekto sa konsentrasyon ng nagmamaneho.',
  },
  {
    id: 74,
    question: "Saang lugar madalas ipinagbabawal ang paglampas o di kaya'y paglusot?",
    options: ['Sa mga highway', 'Sa mga highway na maraming daan o lane', 'Sa kurbada'],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Madalas ipinagbabawal ang pag-overtake o paglusot sa mga kurbada dahil delikado at mahirap makita ang kasalubong na sasakyan.',
  },
  {
    id: 75,
    question: "Ang Student-driver's Permit ay may bisa na hanggang:",
    options: ['anim na buwan', 'isang taon', '90 na araw'],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      "Ang Student-driver's Permit ay may bisa ng isang taon mula sa petsa ng pagkakakuha.",
  },
  {
    id: 76,
    question:
      'Iiwanan mo ang iyong sasakyan sa kalsada, kailan mo pwedeng iwanang nakabukas ang makina?',
    options: [
      'Hindi mo ito iiwanang nakabukas',
      'Kapag iiwanan mo lamang ito ng mga 5 minuto',
      'Kapag 40 kph zone',
    ],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation:
      'Hindi dapat iwanang nakabukas ang makina ng sasakyan kahit sa anumang sitwasyon para maiwasan ang aksidente at polusyon.',
  },
  {
    id: 77,
    question:
      'Ano ang dapat mong gawin kung ikaw ay napipilitang magmaneho nang mabilis dahil sa mga motoristang nasa likuran mo?',
    options: [
      'Gamitin ang directional signal, unti-unting lumipat sa daanan ng mga sasakyang mabagal ang takbo, at hayaang makalampas ang mabibilis na sasakyan sa iyong kaliwa',
      'Tapakan ang preno ng isa o dalawang beses habang paalis sa kalsada',
      'Buksan ang hazard habang tumatakbo ng mabilis',
    ],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation:
      'Ang tamang gawin ay magbigay daan sa mas mabilis na sasakyan sa pamamagitan ng tamang signal at paglipat sa tamang lane.',
  },
  {
    id: 78,
    question: 'Ang sign na ito ay laging nangangahulugan na "STOP" o hinto:',
    options: ['pentagon', 'octagon', 'hexagon'],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Ang octagon na hugis ng traffic sign ay palaging nangangahulugan ng STOP o hinto.',
  },
  {
    id: 79,
    question: 'Ikaw ba ay pwedeng lumiko pakanan sa isang pulang signal?',
    options: [
      'Oo, ito ay isang "protektado" na pagliko, kaya magkakaroon ka ng tamang daan',
      'Oo, magagawa mo lamang pagkatapos na huminto at magbigay daan sa trapiko',
      'Oo, magagawa mo lamang ito kung pinapayagan ka ng isang senyas na gawin ito',
    ],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Ang pagliko pakanan sa pulang ilaw ay pinapayagan lamang kung may senyas na nagpapahintulot dito. Kung wala, ito ay bawal.',
  },
  {
    id: 80,
    question: 'Kailan ka dapat ganap na huminto?',
    options: [
      'Kapag dilaw na traffic light na kumikisap-kisap',
      'Kapag naka-ilaw na ang pulang traffic light',
      'Kapag nasa interseksyon',
    ],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Dapat kang ganap na huminto kapag ang pulang traffic light ay naka-ilaw bilang pagsunod sa batas trapiko.',
  },
  {
    id: 81,
    question:
      'Ano ang gagawin mo kung ikaw ay nakasunod sa student-driver at ito ay huminto sa interseksyon?',
    options: [
      'Agad silang lagpasan',
      'Magparebolusyon sa iyong makina kapag matagal silang umandar',
      'Magpasensya, asahang maaari silang magkamali',
    ],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Ang tamang gawin ay magpasensya at asahan na maaaring magkamali ang student-driver. Iwasan ang pagmamadali at bigyan sila ng pagkakataon.',
  },
  {
    id: 82,
    question: 'Ano ang ibig sabihin ng kumikislap na pulang ilaw pantrapiko?',
    options: [
      'Huminto sa guhit / linya ng paghinto at hintayin ang traffic enforcer',
      'Bilisan ang takbo para maunahan ang pulang ilaw',
      'Huminto sa guhit ng paghinto at dumiretso kung walang panganib',
    ],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Ang kumikislap na pulang ilaw ay nangangahulugang huminto sa guhit ng paghinto at maaari lamang dumiretso kung ligtas at walang panganib.',
  },
  {
    id: 83,
    question: 'Ano ang dapat mong gawin kapag dumadaan sa may paaralan?',
    options: ['Bumusina', 'Pailawin ang head light', 'Bagalan ang takbo'],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Kapag dumadaan sa paaralan, dapat bagalan ang takbo upang maiwasan ang aksidente at bigyang daan ang mga bata.',
  },
  {
    id: 84,
    question:
      'Napansin mo na ang iyong sasakyan ay patuloy na tumatalbog kapag umaapak ka sa preno. Ano ang ibig sabihin nito?',
    options: [
      'Pudpod na ang mga shock absorber',
      'Pudpod na ang mga gulong',
      'Wala sa gitna ang manibela',
    ],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation:
      'Ang patuloy na pagtalbog ng sasakyan kapag nagpreno ay indikasyon na pudpod na ang mga shock absorber at kailangan na itong palitan.',
  },
  {
    id: 85,
    question: 'Kapag papalapit sa tawiran, ang dapat mong gawin ay:',
    options: [
      'maghanda sa pagbagal at paghinto',
      'magmabilis at dumaan ng mabilis',
      'magmaneho lang maliban kung may taong naglalakad',
    ],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation:
      'Kapag papalapit sa tawiran, dapat maghanda sa pagbagal at paghinto upang bigyang daan ang mga tumatawid.',
  },
  {
    id: 86,
    question: 'Ang daloy ng trapiko sa mga rotonda sa Pilipinas ay:',
    options: ['pakanan', 'pakaliwa', 'kahit saang direksyon'],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation: 'Ang tamang daloy ng trapiko sa mga rotonda sa Pilipinas ay pakaliwa.',
  },
  {
    id: 87,
    question:
      'Ano ang dapat mong gawin kapag nasa interseksyon at nakarinig ng sirena sa likod mo?',
    options: [
      'Magpatuloy sa interseksyon, pagkatapos ay gumilid, at hayaang makadaan ang sasakyang pag-emergency',
      'Huminto at huwag gumalaw hanggat hindi nakakadaan ang sasakyang pang-emergency',
      'Umatras, tumabi sa kanang bahagi ng kalsada, at huminto',
    ],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation:
      'Kapag nasa interseksyon, magpatuloy muna at pagkatapos ay gumilid upang bigyang daan ang sasakyang pang-emergency.',
  },
  {
    id: 88,
    question: 'Ano ang gagawin mo kung ikaw ay nakaramdam ng pagod habang nagmamaneho?',
    options: [
      'Magpatuloy sa pagmamaneho pero uminom ng gamot',
      'Maghintay hanggang maging mabuti ang pakiramdam bago magmaneho',
      'Magmaneho nang mabagal at pindutin ang hazard warning na ilaw',
    ],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Kung pagod habang nagmamaneho, huminto at magpahinga hanggang maging maayos ang pakiramdam bago ipagpatuloy ang pagmamaneho.',
  },
  {
    id: 89,
    question: 'Ano ang ibig sabihin ng kumikislap na dilaw na ilaw?',
    options: [
      'Tumigil, pagkatapos ay magpatuloy sa pag-iingat',
      'Tawiran ng taong naglalakad',
      'Magmabagal at magpatuloy ng may pag-iingat',
    ],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Ang kumikislap na dilaw na ilaw ay nangangahulugang magmabagal at magpatuloy ng may pag-iingat.',
  },
  {
    id: 90,
    question: 'Kailan mainam magpraktis ang mga Student driver?',
    options: ['Sa gabi', 'Sa rush hour', 'Kahit anong oras pero dapat labis na mag-ingat'],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      "Mainam magpraktis ang student driver kahit anong oras basta't labis na mag-ingat at sumunod sa mga patakaran.",
  },
  {
    id: 91,
    question: 'Alin sa mga sumusunod ang magpapahusay sa pagkonsumo ng gasolina?',
    options: [
      'Maikling paglalakbay na may malamig na makina tuwing gabi',
      'Pagbabawas ng bilis, tamang pagpepreno, at pagpaplano nang maayos',
      'Pagmamaneho sa mahigit na mababang kambyo habang bukas ang aircon',
    ],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Ang pagbabawas ng bilis, tamang pagpepreno, at pagpaplano ng biyahe ay makakatulong sa mas mahusay na pagkonsumo ng gasolina.',
  },
  {
    id: 92,
    question: 'Ang tamang signal sa kamay para sa pagliko sa kanan ay:',
    options: [
      'kaliwang braso hawakang nakapababa, nakaturo ang kamay sa lupa',
      'kaliwang braso baluktot sa siko, kamay nakaturo sa taas',
      'kaliwang braso na hawakan nang diretso nang pahalang',
    ],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Ang tamang hand signal para sa pagliko sa kanan ay kaliwang braso baluktot sa siko, kamay nakaturo sa taas.',
  },
  {
    id: 93,
    question:
      'Papalapit ka sa isang kanto kung saan maraming sasakyan. Mayroong mga linya na may pagmamarka ng kalsada. Sa huling sandali napagtanto mo na ikaw ay nasa maling linya. Dapat mo:',
    options: [
      'pilitin na makadaan',
      'huminto hanggang sa mabakante ang lugar',
      'magpatuloy sa linya na iyon',
    ],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Kung napagtanto mong nasa maling linya ka na, magpatuloy na lang sa linya na iyon at huwag biglang lumipat upang maiwasan ang disgrasya.',
  },
  {
    id: 94,
    question:
      'Sa R.A. 8750 o Seat Belt Act, legal ba para sa bata na wala pang anim na taong gulang ang umupo sa kandungan ng matanda sa harapang upuan ng sasakyan?',
    options: ['Oo', 'Oo, kung wala ng bakanteng upuan sa likod', 'Hindi'],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Ayon sa Seat Belt Act, hindi legal para sa batang wala pang anim na taong gulang na umupo sa harapan, lalo na sa kandungan ng matanda.',
  },
  {
    id: 95,
    question:
      'Ano ang dapat mong gawin kung ang isang paparating na sasakyan ay napilitang tumawid sa gitnang linya upang hindi mabangga ang isa pang sasakyan na biglang umalis sa kaniyang lane?',
    options: [
      'Huwag itong pansinin sapagkat ikaw ang may karapatan sa daan',
      'Bumusina at pailawin ang mga head light',
      'Maging alisto o maingat, maghandang bagalan ang takbo, at magbigay ng daan',
    ],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Ang tamang gawin ay maging alerto, maghanda sa pagbagal, at magbigay daan upang maiwasan ang aksidente.',
  },
  {
    id: 96,
    question:
      'Kapag nakakita ka ng ilaw pantrapiko na nagpalit mula sa dilaw, anong kulay ang dapat mong asahan na susunod?',
    options: ['Amber', 'Pula', 'Asul'],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation: 'Pagkatapos ng dilaw na ilaw pantrapiko, ang susunod ay pula.',
  },
  {
    id: 97,
    question:
      'Ano ang paglabag ng driver kung nagpapatakbo ito ng sasakyang kumikislap-kislap ang ilaw ng preno?',
    options: [
      'Ilegal na modipikasyon (Illegal modification)',
      'Sagabal sa daan (Obstruction)',
      'Hindi ligtas na pagmamaneho (Unsafe driving)',
    ],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation: 'Ang kumikislap-kislap na ilaw ng preno ay itinuturing na ilegal na modipikasyon.',
  },
  {
    id: 98,
    question:
      'Kung paparada ka sa isang kalyeng pataas at walang bangketa, iayon / ipaling ang gulong patungo sa:',
    options: ['gitna ng kalye', 'gilid ng kalye', 'dulo ng kalye'],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Kung paparada sa kalyeng pataas at walang bangketa, ipaling ang gulong patungo sa gilid ng kalye para sa kaligtasan.',
  },
  {
    id: 99,
    question:
      'Maliban sa pagbukas ng iyong signal, ano ang marapat mong gawin kung patungo sa highway?',
    options: [
      'Bawasan ang tulin ng takbo upang makaiwas sa road crash',
      'Itugma ang bilis sa daloy ng trapiko sa loob ng highway',
      'Tuluyang huminto at hintaying maging maluwag at ligtas ang daanan',
    ],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Dapat itugma ang bilis sa daloy ng trapiko sa highway upang makasabay ng maayos at ligtas.',
  },
  {
    id: 100,
    question:
      'Maliban sa pagbukas ng iyong signal, ano ang marapat mong gawin kung patungo sa highway?',
    options: [
      'Bawasan ang tulin ng takbo upang makaiwas sa road crash',
      'Itugma ang bilis sa daloy ng trapiko sa loob ng highway',
      'Tuluyang huminto at hintaying maging maluwag at ligtas ang daanan',
    ],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Dapat itugma ang bilis sa daloy ng trapiko sa highway upang makasabay ng maayos at ligtas.',
  },
  {
    id: 101,
    question: 'Kapag gusto mong bagalan ang takbo o huminto, dapat na:',
    options: [
      'bumusina',
      'banayad na tapakan ang preno upang umilaw ang iyong brake lights',
      'manatili sa iyong daanan o lane at huminto',
    ],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Dapat banayad na tapakan ang preno upang umilaw ang brake lights at mabigyan ng babala ang mga sasakyan sa likod.',
  },
  {
    id: 102,
    question:
      'Ayon sa R.A. 8750, ang mga bata ay dapat nakaupo sa aprobadong child restraint kung sila ay:',
    options: ['10 taong gulang', '6 na taong gulang at pababa', '7 taong gulang'],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Ayon sa R.A. 8750, ang mga bata na 6 na taong gulang at pababa ay dapat nakaupo sa child restraint.',
  },
  {
    id: 103,
    question: 'Ang tamang senyas ng kamay kapag kumakanan ay:',
    options: [
      'ang kaliwang braso at kamay ay nakaturo sa kaliwa',
      'ang kaliwang braso at kamay ay nakaturo sa itaas',
      'ang kaliwang braso ay nakapababa at kamay ay nakaturo sa lupa',
    ],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Ang tamang hand signal kapag kumakanan ay ang kaliwang braso at kamay ay nakaturo sa itaas.',
  },
  {
    id: 104,
    question: 'Alin sa mga sumusunod ang nakalarawan?',
    options: ['Babala ng sangandaan', 'Istasyon ng first aid', 'Babala ng daang tren'],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation:
      'Ang larawan ay isang babala ng sangandaan, na nagpapahiwatig ng intersection sa kalsada.',
    image: '/images/104.png', // Replace with actual image path
  },
  {
    id: 105,
    question:
      'Ikaw ay naghahanap ng lugar kung saan pwede iparada ang iyong sasakyan. Ang lugar ay puno maliban sa puwang ng minarkahang "PWD" / Person with Disability. Ikaw ay:',
    options: [
      'gamitin ang mga puwang na ito kapag ang ibang lugar ay puno',
      'hindi paparada doon maliban kung pinahihintulutan',
      'gamitin ang paradahan may kapansanan man o wala',
    ],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Hindi ka dapat mag-park sa PWD slot maliban kung pinahihintulutan o ikaw ay may PWD ID.',
  },
  {
    id: 106,
    question:
      'Totoo ba na ang student driver ay hindi hinuhuli sa anumang paglabag sa batas trapiko?',
    options: [
      'Totoo, ang violation ticket ay ibibigay sa nagtuturo',
      'Hindi totoo, ang violation ticket ay ibibigay sa nag-aaral',
      'Hindi totoo, ang violation ticket ay ibinibigay lamang sa mga propesyonal na driver ng sasakyang publiko',
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Hindi totoo. Ang student driver ay mananagot din sa anumang paglabag sa batas trapiko at ang violation ticket ay ibibigay sa nag-aaral.',
  },
  {
    id: 107,
    question: 'Sa pagmamaneho sa kalsada, dapat handa ang mga dokumentong ito:',
    options: [
      'DL at Rehistro at Insurance Policy',
      'May bisa na DL at updated na Rehistro at insurance Policy',
      'CPC at Fare Matrix',
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      "Dapat laging may bisa na Driver's License, updated na rehistro, at insurance policy habang nagmamaneho.",
  },
  {
    id: 108,
    question: 'Sa rotonda, alin ang may karapatan sa daan?',
    options: [
      'Mga sasakyan sa rotonda',
      'Mga sasakyang paparating sa rotonda',
      'Mga sasakyang nakaharap sa berde/law',
    ],
    correctAnswer: 0, // Option A is correct
    explanation: 'Ang mga sasakyan na nasa loob na ng rotonda ang may karapatan sa daan.',
  },
  {
    id: 109,
    question:
      'Kung bababa ang pasahero sa kotse, ano ang bahagi ng sasakyan ang pinakaligtas babaan?',
    options: ['Kaliwang pintoan', 'Kanang pintoan', 'Likod ng sasakyan o hatchback'],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Ang kanang pintoan (passenger side) ang pinakaligtas babaan upang maiwasan ang panganib mula sa mga sasakyan sa kalsada.',
  },
  {
    id: 110,
    question: 'Nagmaneho ka sa expressway. Hihinto ka lamang kapag:',
    options: [
      'nagbaba o nagsasakay ng mga kargamento',
      'kapag tatawag para sa emergency',
      'magtanong ng direksyon',
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Sa expressway, tanging sa emergency lamang pinapayagan ang paghinto. Bawal ang huminto para magbaba, magsakay, o magtanong ng direksyon.',
  },
  {
    id: 111,
    question:
      'Ang pagmamaneho nang nakainom o may impluwensya ng iba pang ilegal na sangkap ay labag sa batas at maaaring magresulta sa:',
    options: [
      'parusang mabigat na multa',
      'habambuhay na pagbawi ng lisensya sa pagmamaneho',
      'walang katiyakang pagkakasuspinde ng lisensya sa pagmamaneho',
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Ang pagmamaneho nang nakainom o may ilegal na sangkap ay maaaring magresulta sa habambuhay na pagbawi ng lisensya sa pagmamaneho bilang pinakamabigat na parusa.',
  },
  {
    id: 112,
    question: 'Ang ibig sabihin ng pulang "X" sa mga toll gate ay:',
    options: [
      'hindi ka maaari sa lane na ito',
      'maaari ka sa lane na ito',
      'kailangan mong umalis sa lane na ito',
    ],
    correctAnswer: 0, // Option A is correct
    explanation:
      'Ang pulang "X" sa toll gate ay nangangahulugang hindi ka maaaring dumaan o gumamit ng lane na iyon.',
  },
  {
    id: 113,
    question: 'Ano ang ibig sabihin ng berdeng arrow na trapikong ilaw?',
    options: [
      'Pwedeng tumawid ang taong naglalakad',
      'Bawal pumunta sa direksyon ng arrow',
      'Nagpapahintulot sa mga sasakyan na pumunta sa direksyon ng arrow',
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Ang berdeng arrow sa traffic light ay nagpapahintulot sa mga sasakyan na pumunta sa direksyon ng arrow.',
  },
  {
    id: 114,
    question: 'Papalapit ka sa traffic light na naka-green na ng ilang minuto. Dapat kang:',
    options: ['maghanda sa paghinto', 'magmabilis ng sobra', 'panatilihin ang bilis'],
    correctAnswer: 0, // Option A is correct
    explanation:
      'Kung matagal nang green ang traffic light, dapat maghanda sa paghinto dahil maaaring magbago na ito sa dilaw o pula.',
  },
  {
    id: 115,
    question: 'Para saan ang kaliwang linya ng tatlong linya na expressway?',
    options: ['Mga coach lang', 'Mga sasakyang pang-emergency lang', 'Sa pag-o-overtake'],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Ang kaliwang linya ng expressway ay para sa pag-o-overtake ng mas mabagal na sasakyan.',
  },
  {
    id: 116,
    question:
      'Kapag liliko ka sa sulok, ang driver ay gagamit ng pamamaraang ito sa pagmamanobra ng manibela:',
    options: [
      'dalawang kamay na pamamaraan',
      'hand-over na pamamaraan',
      'hand-to-hand na pamamaraan',
    ],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Ang hand-over na pamamaraan ang tamang paraan ng pagliko sa sulok para sa mas kontroladong pagmamaneho.',
  },
  {
    id: 117,
    question: 'Ang tamang pagsuot ng 3 point seatbelt ay:',
    options: ['sa ilalim ng balikat', 'paikot sa balikat at kandungan', 'sa ibabaw ng braso'],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Ang tamang pagsuot ng 3 point seatbelt ay paikot sa balikat at kandungan para sa maximum na proteksyon.',
  },
  {
    id: 118,
    question: 'Kapag inaantok ka habang nagmamaneho, ano ang dapat mong gawin?',
    options: [
      'Buksan ang aircon o ang bintana',
      'Buksan ang radio nang napakalakas',
      "Huminto, magpahinga, at kung maaari'y magpapalit muna",
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Ang tamang gawin kapag inaantok ay huminto, magpahinga, at kung maaari ay magpalit ng driver. Hindi sapat ang pagbukas ng aircon, bintana, o radio para mapanatili ang kaligtasan.',
  },
  {
    id: 119,
    question: 'Ano ang ibig sabihin ng senyas trapiko na ito?',
    image: '/images/end-60.png', // Placeholder path
    options: [
      'Bawal pumasok ang mga sasakyang 30 taon ang edad',
      'Pinakamababang itinakdang bilis',
      'Katapusan ng pinakamataas na itinakdang bilis',
    ],
    correctAnswer: 2, // Option C is correct
    explanation:
      'Ang senyas na ito ay nangangahulugang katapusan ng pinakamataas na itinakdang bilis (speed limit ends).',
  },
  {
    id: 120,
    question: 'Ang anumang dami ng inuming ito ay makapagpapahamak sa iyong pagmamaneho:',
    options: ['tubig', 'alkohol', 'pineapple juice'],
    correctAnswer: 1, // Option B is correct
    explanation:
      'Kahit kaunting alkohol ay maaaring makasama sa iyong pagmamaneho dahil nakakaapekto ito sa iyong konsentrasyon, koordinasyon, at paghusga.',
  },
  {
    id: 121,
    question:
      'Ano ang kulay ng marka sa kalsada na naghihiwalay sa isang highway na may maraming lane?',
    options: ['Kahel', 'Pula', 'Puti'],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Ang puting linya ang naghihiwalay sa mga lane sa isang highway na may maraming lane.',
    image: 'https://user-images.githubusercontent.com/placeholder/your-uploaded-image.png', // Replace with actual image URL if needed
  },
  {
    id: 122,
    question:
      'Ano ang magiging resulta kapag pinalitan ng hindi angkop na ilaw o bumbilya ang head light?',
    options: [
      'Higit na malinaw ang daan lalo na sa gabi',
      'Nakagagambala ito sa mga motoristang nanggagaling sa kabilang direksyon at ito ay labag sa batas trapiko',
      'Nakagagambala ito sa mga pasahero',
    ],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation:
      'Ang paggamit ng hindi angkop na ilaw o bumbilya sa head light ay nakagagambala sa mga motoristang nanggagaling sa kabilang direksyon at ito ay labag sa batas trapiko.',
    image: 'https://user-images.githubusercontent.com/placeholder/your-uploaded-image-2.png', // Replace with actual image URL if needed
  },
  {
    id: 123,
    question: 'Sa pagmamaneho, ang pinakamahalagang pandama na kailangan ng driver ay:',
    options: ['pandinig', 'pang-amoy', 'paningin'],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Ang paningin ang pinakamahalagang pandama na kailangan ng driver upang maging ligtas sa pagmamaneho.',
    image: 'https://user-images.githubusercontent.com/placeholder/your-uploaded-image-3.png', // Replace with actual image URL if needed
  },
  {
    id: 124,
    question: 'Alin sa mga sumusunod ang nakalarawan?',
    options: ['Madulas na kalsada', 'Baku-bakong kalsada', 'Matarik na kalsada'],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation: 'Ang larawan ay nagpapakita ng warning sign para sa baku-bakong kalsada.',
    image: '/images/124.png', // Replace with actual image URL if needed
  },
  {
    id: 125,
    question:
      'Kapag sumunod sa isa pang kotse, itinuturing na isang ligtas na patakaran na magpanatili ng distansyang layo na hindi bababa sa:',
    options: [
      '15 talampakan',
      'loob ng dalawang-segundong panuntunan',
      'espasyo para sa isang kotse',
    ],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Ang ligtas na distansya sa pagsunod sa isang kotse ay espasyo para sa isang kotse.', // Replace with actual image URL if needed
  },
  {
    id: 126,
    question:
      'Nasa expressway ka at paparatang sa toll gate. Mayroong kumikislap na pulang ilaw sa itaas ng bawat lane. Dapat kang:',
    options: ['pumunta sa lay-by', 'umalis at umatras', 'huminto at maghintay'],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Kapag may kumikislap na pulang ilaw sa itaas ng bawat lane sa toll gate, dapat kang huminto at maghintay.',
    // Replace with actual image URL if needed
  },
  {
    id: 127,
    question: 'Ang lahat ng mga nagmamaneho ay nararapat magbigay ng right-of-way sa:',
    options: [
      'mga tambay',
      'mga sasakyan de-motor na matuling umaandar',
      'mga sasakyang pangkagipitan (emergency vehicle)',
    ],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Ang lahat ng nagmamaneho ay nararapat magbigay ng right-of-way sa mga sasakyang pangkagipitan o emergency vehicles.',
  },
  {
    id: 128,
    question: 'Ang mga parking brake ay maaaring gamitin sa:',
    options: ['kagipitan o bilang emergency brake', 'pagparada', 'drifting'],
    correctAnswer: 1, // Option B is correct (green highlighted)
    explanation: 'Ang parking brake ay pangunahing ginagamit para sa pagparada ng sasakyan.',
  },
  {
    id: 129,
    question: 'Ang ibig sabihin ng hindi gumagalaw na pulang exis ("X") ay:',
    options: [
      'dapat kang umalis sa linyang ito',
      'maaari kang magmaneho sa daang ito',
      'hindi ka maaaring magmaneho sa daang ito',
    ],
    correctAnswer: 2, // Option C is correct (green highlighted)
    explanation:
      'Ang hindi gumagalaw na pulang "X" ay nangangahulugang hindi ka maaaring magmaneho sa daang iyon.',
  },
  {
    id: 130,
    question: 'Kailan mo maaring gamitin ang mga hazard warning na ilaw habang nagmamaneho?',
    options: [
      'Sa highway upang magbigay ng babala na may panganib sa unahan',
      'Sa matataong lugar, sa halip na magbusina sa loob ng 11:30 ng gabi hanggang 7 ng umaga',
      'Sa mga panlalawigang ruta, pagkatapos ng babala ng mga hayop',
    ],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation:
      'Ang hazard warning lights ay ginagamit upang magbigay babala ng panganib sa unahan, lalo na sa highway.',
  },
  {
    id: 131,
    question: 'Ano ang pinakamabuting alituntuning pangkaligtasan habang ikaw ay nagmamaneho?',
    options: [
      'Bumusina upang igiit ang iyong karapatan sa daan',
      'Laging igiit ang karapatan sa daan',
      'Huwag ipilit ang karapatan sa daan',
    ],
    correctAnswer: 2,
    explanation:
      'Ang pinakamabuting alituntunin ay huwag ipilit ang karapatan sa daan para sa kaligtasan ng lahat.',
  },
  {
    id: 132,
    question:
      'Sino ang may karapatan sa daan sa dalawang sasakyang nanggagaling sa magkaibang direksyon sa makipot at paakyat na daan?',
    options: [
      'Ang higit na mabilis na sasakyan',
      'Ang maunang makapagpailaw ng head light',
      'Ang sasakyang paakyat',
    ],
    correctAnswer: 2,
    explanation: 'Ang sasakyang paakyat ang may karapatan sa daan sa makipot at paakyat na daan.',
  },
  {
    id: 133,
    question: 'Maaari ka bang kumanan kapag pula ang nakailaw?',
    options: [
      'Oo, ito ay protektadong pagliko, kaya may karapatan ka sa daan',
      'Oo, pwede pero pagkatapos lamang ng nakahinto at nagparaan sa mga sasakyan',
      'Oo, pwede kung may karatulang nagpapahintulot sa iyo na gawin ito. Ang karatula ay maaaring magsasabing "Turn Right With Care on Red Signal After a Full Stop"',
    ],
    correctAnswer: 2,
    explanation: 'Pwede lamang kumanan sa pula kung may karatulang nagpapahintulot dito.',
  },
  {
    id: 134,
    question:
      'Ano ang tamang panuntunan bago pumasok ang sasakyan sa publikong kalsada mula sa garahe, eskinita, o pribadong daan?',
    options: [
      'Dapat huminto at magbigay ng daan sa mga sasakyan sa kalsada at sa mga naglalakad',
      'Ang sasakyan ang may karapatan sa kahit anong direksyon ng daan',
      'Ikaw ang may karapatan sa daan na mula sa kaliwang bahagi ng kalsada',
    ],
    correctAnswer: 0,
    explanation:
      'Dapat huminto at magbigay daan sa mga sasakyan at pedestrian bago pumasok sa publikong kalsada.',
  },
  {
    id: 135,
    question:
      'Kapag may isa pang linya na bukas o pwedeng daanan, ayos lang ba na magpatuloy sa normal na bilis kapag may sasakyang pang-emergency?',
    options: ['Oo', 'Hindi', 'Depende sa abilidad ng driver'],
    correctAnswer: 1,
    explanation: 'Hindi, dapat magbigay daan sa sasakyang pang-emergency.',
  },
  {
    id: 136,
    question:
      'Hindi ka sigurado kung ang iyong gamot sa ubo ay may epekto sa iyo, ano ang dapat mong gawin?',
    options: [
      'Magmaneho kapag mabuti ang pakiramdam',
      'Humingi ng payo sa kaibigan o kakilala',
      'Tanungin ang iyong doktor at suriin ang lebel ng gamot',
    ],
    correctAnswer: 2,
    explanation:
      'Ang tamang gawin ay tanungin ang doktor at suriin ang lebel ng gamot bago magmaneho.',
  },
  {
    id: 137,
    question: 'Ano ang dapat mong gawin kapag ang iyong preno ay nabasa at humina?',
    options: [
      'Apakan ang preno nang maraming beses',
      'Bilisan ng husto',
      'Itigil at punasan ang mga ito',
    ],
    correctAnswer: 0,
    explanation: 'Ang tamang gawin ay apakan ang preno nang maraming beses upang matuyo ito.',
  },
  {
    id: 138,
    question: 'Aling senyas trapiko ang nagsasaad ng regulasyon at pagbabawal?',
    options: [
      { type: 'image', src: '/images/138-a.png', alt: 'Red circle traffic sign' },
      { type: 'image', src: '/images/138-b.png', alt: 'Blue circle traffic sign' },
      { type: 'image', src: '/images/138-c.png', alt: 'Brown arrow traffic sign' },
    ],
    correctAnswer: 0, // Option A is correct (green highlighted)
    explanation: 'Ang pulang bilog na senyas trapiko ay nagsasaad ng regulasyon at pagbabawal.',
  },
  {
    id: 139,
    question: 'Ano ang gagawin mo kung may matatandang tumatawid sa kalsada?',
    options: [
      'Kumaway ka upang malaman nila na nakita mo sila',
      'Bumusina nang tuloy-tuloy',
      'Magpasensya at hayaan silang makatawid',
    ],
    correctAnswer: 2,
    explanation:
      'Ang tamang gawin ay magpasensya at hayaan silang makatawid para sa kanilang kaligtasan.',
  },
  {
    id: 140,
    question:
      'Kung lalapit ka sa isang interseksyon kung saan walang pulis na nagtatrabaho at walang signal, dapat kang patungo sa:',
    options: [
      'trapiko mula sa iyong likuran',
      'trapiko na nagmula sa iyong harap',
      'trapiko na nagmula sa iyong kanan',
    ],
    correctAnswer: 2,
    explanation: 'Dapat kang magbigay daan sa trapiko na nagmumula sa iyong kanan.',
  },
  {
    id: 141,
    question:
      'Kung nagmamaneho sa daanan o lane na malapit na sa dulo nito, ano ang una mong dapat gawin upang makapasok nang hindi nakakaabala sa daloy ng ibang trapiko? (Rule of Continuity Line)',
    options: [
      'Lumipat bigla ng daanan o lane sa kaliwa',
      'I-angkop ang bilis ng takbo sa daloy ng trapiko',
      'Pumili ng isang angkop na agwat sa kaliwang daanan o lane',
    ],
    correctAnswer: 1,
    explanation:
      'Ang tamang gawin ay i-angkop ang bilis ng takbo sa daloy ng trapiko upang makapasok nang maayos.',
  },
  {
    id: 142,
    question: 'Ano ang dapat mong gawin kung nagmamaneho ka nang gabi sa mga kalsada sa bundok?',
    options: [
      'Bumusina kapag papalapit sa kurbada',
      'Mag-ilaw at bilisan ang takbo',
      'Pailawin ang dim light tuwing papalapit sa kurbada',
    ],
    correctAnswer: 2,
    explanation: 'Pailawin ang dim light tuwing papalapit sa kurbada para sa kaligtasan.',
  },
  {
    id: 143,
    question: 'Sa aling lugar hindi pwedeng mag-overtake?',
    options: ['Sa two-way na interseksyon', 'Sa tulay', 'Sa expressway'],
    correctAnswer: 0,
    explanation: 'Bawal mag-overtake sa two-way na interseksyon.',
  },
  {
    id: 144,
    question:
      'Kung iniuunat ng driver ng sasakyan sa harapan mo ang kaniyang kaliwang braso at tumuturo ang kamay sa kaliwa, siya ay:',
    options: ['hihinto', 'liliko pakanan', 'liliko pakaliwa'],
    correctAnswer: 2,
    explanation:
      'Kapag ang kaliwang braso ay iniuunat at tumuturo sa kaliwa, liliko siya pakaliwa.',
  },
  {
    id: 145,
    question: 'Sa anong pagkakataon maaaring pumarada sa harap ng pasukan ng ospital?',
    options: [
      'Kung ikaw ay bibili ng gamot',
      'Kung ikaw ay empleyado ng ospital',
      'Wala sa mga nabanggit',
    ],
    correctAnswer: 2,
    explanation:
      'Hindi maaaring pumarada sa harap ng pasukan ng ospital sa alinmang nabanggit na pagkakataon.',
  },
  {
    id: 146,
    question: 'Alin sa mga sumusunod ang nakalarawan?',
    options: [
      'Papasok sa sangandaan',
      'Sasanib sa trapiko pagpasok sa sangandaan',
      'Papasok sa sangandaan na may kalsada sa gilid',
    ],
    correctAnswer: 1,
    explanation:
      'Ang larawan ay nagpapakita ng warning sign para sa pagsasanib ng trapiko sa sangandaan.',
    image: '/images/146.png',
  },
  {
    id: 147,
    question: 'Maaari lamang gumamit ng mobile phone kapag:',
    options: ['may sasaguting tawag', 'nagmaneho ng otomatikong sasakyan', 'nakaparada'],
    correctAnswer: 2,
    explanation:
      'Maaari lamang gumamit ng mobile phone kapag nakaparada upang maiwasan ang disgrasya.',
  },
  {
    id: 148,
    question: 'Tama bang pumarada sa tabi ng boka-insendiyo o fire hydrant anumang oras?',
    options: [
      'Mali, ang boka-insendiyo o fire hydrant ay para sa ambulansya lamang',
      'Mali, ang boka insendiyo o fire hydrant ay isang kagamitang pangkagipitan, walang sinuman ang pinahihintulutan pumarada sa tabi nito',
      'Mali, tanging ang mga sasakyang pangkagipitan (emergency) lamang ang maaaring pumarada sa tabi ng boko-insendiyo o fire hydrant',
    ],
    correctAnswer: 1,
    explanation:
      'Walang sinuman ang pinahihintulutan pumarada sa tabi ng fire hydrant anumang oras.',
  },
  {
    id: 149,
    question: 'Kung walang linya na minarkahan sa kalsada, dapat kang magmaneho:',
    options: [
      'malapit sa kanang bahagi ng kalsada',
      'sa gitna ng kalsada',
      'kahit saang bahagi ng kalsada',
    ],
    correctAnswer: 0,
    explanation: 'Dapat magmaneho malapit sa kanang bahagi ng kalsada kung walang linya.',
  },
  {
    id: 150,
    question:
      'Ano ang magiging resulta ng hindi pagpatay ng signal light matapos lumiko mula sa interseksyon?',
    options: [
      'Makakapagpapalito sa lahat ng mga nasa daan',
      'Makakapagpapalito sa lahat ng mga motorista',
      'Makakapagpapalito sa mga tagapagpatupad ng batas pantrapiko',
    ],
    correctAnswer: 0,
    explanation: 'Ang hindi pagpatay ng signal light ay makakapagpalito sa lahat ng mga nasa daan.',
  },
  {
    id: 151,
    question:
      'Ano ang dapat mong gawin kung pinapatakbo ka ng pulis pantrapiko kahit na pula na ang traffic light o senyas na ng paghinto?',
    options: [
      'Hindi mo dapat pansinin ang pulis pantrapiko at hintayin ang traffic light na berde. Ito ay alinsunod sa mga isinasakatuparang tuntunin at regulasyon ng mga traffic enforcers',
      'Dapat kang sumunod',
      'Hindi ka dapat sumunod sapagkat kung susunod ka ay huhulihin ka',
    ],
    correctAnswer: 1,
    explanation: 'Dapat kang sumunod sa pulis pantrapiko kahit pula na ang traffic light.',
  },
  {
    id: 152,
    question:
      'Kapag nagmamaneho ng sasakyan na may Anti-lock Braking System (ABS) sa pinakamabilis na takbo at kailangan mong biglaang huminto, ano ang dapat mong gawin?',
    options: [
      'Tapakan ang pedal ng preno ng tuloy-tuloy',
      'Bombahin ang preno',
      'Pumreno ng banayad',
    ],
    correctAnswer: 2,
    explanation: 'Ang tamang gawin ay pumreno ng banayad kapag may ABS.',
  },
  {
    id: 153,
    question:
      'Pagkalampas sa isang sasakyan, maaari ka nang bumalik sa orihinal na daanan o lane kung:',
    options: [
      'natatanaw mo sa gilid na salamin o kaya sa rear-view mirror ang sasakyang nilampasan',
      'bumusina ang driver na nilampasan mo',
      'nililingon ang sasakyang nilampasan',
    ],
    correctAnswer: 0,
    explanation:
      'Maaari ka nang bumalik sa lane kung natatanaw mo na sa salamin ang nilampasang sasakyan.',
  },
  {
    id: 154,
    question: 'Sino ang responsable upang hindi mag-overload ang sasakyan?',
    options: [
      'Ang may-ari ng sasakyan',
      'Ang driver o ang pasahero ng sasakyan',
      'Ang taong nagpapasakay sa sasakyan',
    ],
    correctAnswer: 1,
    explanation: 'Ang driver o pasahero ang responsable upang hindi mag-overload ang sasakyan.',
  },
  {
    id: 155,
    question:
      'Naghahanap ka ng mapaparadahan ng iyong sasakyan. Puno na ang lugar maliban sa puwang na may marking "Taong May Kapansanan". Alin sa mga ito ang tama?',
    options: [
      'Pwede mong gamitin ang mga espasyong ito kapag puno na ang ibang lugar',
      'Pwedeng gamitin ang espasyong ito, may kapansanan ka man o wala',
      'Hindi ka dapat pumarada doon maliban kung ikaw ay PWD o mayroong kang kasama na PWD',
    ],
    correctAnswer: 2,
    explanation: 'Hindi ka dapat pumarada sa PWD slot maliban kung ikaw ay PWD o may kasamang PWD.',
  },
  {
    id: 156,
    question:
      "Pagkaraang mabigyan ng Student Driver's Permit, ano ang pangunahing isasaalang-alang sa pag-aaral at pagpapatakbo ng sasakyang de-motor?",
    options: [
      'Ang nag-aaral magmaneho ay dapat may malusog na pangangatawan sa panahon ng pagsasanay kahit walang instructor upang maiwasan ang banggaan sa kalsada',
      'Kailangang magsanay sa pagmamaneho ang nag-aaral at dapat may kasamang lisensyadong driver na may DL Code na angkop sa uri ng sasakyang de-motor na imamaheno',
      'Kailangang magsanay mag-isa sa pagmamaneho ang nag-aaral upang makapasa sa eksaminasyon na pang-Non-Professional na lisensya',
    ],
    correctAnswer: 1,
    explanation: 'Dapat may kasamang lisensyadong driver na may tamang DL Code ang student driver.',
  },
  {
    id: 157,
    question:
      'Kapag nakarating ka sa interseksyon na walang traffic enforcer at walang mga traffic signal, dapat kang magbigay daan sa:',
    options: [
      'trapiko / mga sasakyan na nagmula sa iyong kaliwa',
      'trapiko / mga sasakyan katapat sa kasalungat ng iyong direksyon',
      'trapiko / mga sasakyan na nagmula sa iyong kanan',
    ],
    correctAnswer: 2,
    explanation: 'Dapat magbigay daan sa trapiko na nagmumula sa iyong kanan.',
  },
  {
    id: 158,
    question:
      'Ang paglusot o overtaking sa pataas na kalsadang patungo sa tulay ay ipinagbabawal maliban kung:',
    options: [
      'malinaw na nakikita ng nagmamaneho ang daan sa layong hindi bababa sa 75 metro',
      'malinaw na nakikita ng nagmamaneho ang daan sa layong hindi bababa sa 100 metro',
      'malinaw na nakikita ng nagmamaneho ang daan sa layong hindi bababa sa 150 metro',
    ],
    correctAnswer: 2,
    explanation:
      'Pinapayagan lamang ang overtaking kung malinaw na nakikita ang daan ng hindi bababa sa 150 metro.',
  },
  {
    id: 159,
    question:
      'Pumapasok ka sa isang lugar ng mga ginagawang kalsada kung saan pansamantalang may limitasyon sa bilis ng sasakyan. Ikaw ay dapat:',
    options: [
      'sundin ang limitasyon lamang tuwing rush hour',
      'sundin ang limitasyon ng bilis tulad ng nasa batas',
      'hindi lalampas sa limitasyon ng bilis',
    ],
    correctAnswer: 1,
    explanation: 'Dapat sundin ang limitasyon ng bilis tulad ng nasa batas.',
  },
  {
    id: 160,
    question: 'Sa interseksyon na may ilaw pantrapiko, liliko lamang pakaliwa kapag:',
    options: [
      'bukas ang pulang ilaw o pulang ilaw na arrow',
      'dumaan na ang parating na mga sasakyang didiretso',
      'nakailaw ang berdeng kaliwang arrow',
    ],
    correctAnswer: 2,
    explanation: 'Liliko lamang pakaliwa kapag nakailaw ang berdeng kaliwang arrow.',
  },
  {
    id: 161,
    question: 'Kailan ka dapat bumusina?',
    options: [
      'Kapag magbibigay babala sa iyong presensya',
      'Kapag gustong gambalain ang ibang motorist',
      'Kapag tatawagin ang pansin ng kaibigan',
    ],
    correctAnswer: 0,
    explanation: 'Dapat bumusina lamang upang magbigay babala sa iyong presensya.',
  },
  {
    id: 162,
    question: 'Ang mga karatula sa limitasyon ng bilis sa mga daan ay dapat ituro na:',
    options: [
      'ang inirerekomenda na bilis sa kahit anong kondisyon ng daan at panahon',
      'ang inirerekomenda na bilis sa pinakamaaayos na kondisyon ng daan at panahon',
      'ang inirerekomenda na bilis sa pinaka hindi maayos na kondisyon ng daan at panahon',
    ],
    correctAnswer: 1,
    explanation: 'Ang speed limit signs ay para sa pinakamaaayos na kondisyon ng daan at panahon.',
  },
  {
    id: 163,
    question:
      'Alin sa mga sumusunod na palatandaan ang nagsasaad ng mga regulasyon, kapag binalewala, ay magiging isang openso?',
    options: ['Regulatory signs', 'Informative signs', 'Warning signs'],
    correctAnswer: 0,
    explanation: 'Ang regulatory signs ay nagsasaad ng mga regulasyon at paglabag dito ay openso.',
  },
  {
    id: 164,
    question: 'Kailan pinahihintulutan ang pagtawid sa dalawang solidong dilaw na linya?',
    options: [
      'Kapag sumusunod sa mabagal na trak',
      'Kapag nasa national highway',
      'Ang pagdaan ay hindi pinahihintulutan kailanman',
    ],
    correctAnswer: 2,
    explanation:
      'Ang pagtawid sa dalawang solidong dilaw na linya ay hindi pinahihintulutan kailanman.',
  },
  {
    id: 165,
    question:
      'Kapag nasa sangandaan at nakita ng driver na mula sa dilaw o yellow light signal ay nagpalit ito sa pula o red ay:',
    options: [
      'hihinto ito sa daan',
      'magpapatuloy ito sa interseksyon kahit ang ilaw ay pula',
      'magmamabagal ito para hayaan ang ibang sasakyan na magpatuloy',
    ],
    correctAnswer: 1,
    explanation: 'Ang tamang sagot ay magpapatuloy ito sa interseksyon kahit ang ilaw ay pula.',
  },
  {
    id: 166,
    question: 'Aling sa mga sumusunod ang nakalarawan?',
    options: ['Bawal ang likong pabalik', 'Bawal bumusina', 'Bawal pumarada'],
    correctAnswer: 1,
    explanation: 'Ang larawan ay nagpapakita ng senyas na bawal bumusina.',
    image: '/images/166.png',
  },
  {
    id: 167,
    question: "Ang DL ay para sa Driver's License samantalang ang VIN ay para sa:",
    options: [
      'Vehicle Identification Number',
      'Vehicle Information Number',
      'Very Important Nonprofessional Driver',
    ],
    correctAnswer: 0,
    explanation: 'VIN stands for Vehicle Identification Number.',
  },
  {
    id: 168,
    question:
      'Magkano ang parusa sa unang openso ng pagpapasakay sa harapang upuan sa batang (6) anim na taong gulang pababa?',
    options: ['Php 1,500', 'Php 1,000', 'Php 2,000'],
    correctAnswer: 1,
    explanation: 'Ang parusa sa unang openso ay Php 1,000.',
  },
  {
    id: 169,
    question: 'Kapag nasiraan ka ng sasakyan sa daan, ano ang gagawin mo?',
    options: [
      'Iwan mo ang sasakyan at tumawag ka ng mekaniko',
      'Patayin ang makina at tumawag ng mekaniko',
      'Pailawin ang hazard warning light at maglagay ng EWD 10 metro man lamang sa likuran ng nakahintong sasakyan',
    ],
    correctAnswer: 2,
    explanation:
      'Pailawin ang hazard warning light at maglagay ng EWD 10 metro man lamang sa likuran ng nakahintong sasakyan.',
  },
  {
    id: 170,
    question: 'Kung ikaw ay pumaparada sa tabi ng sasakyang nakaparada, ikaw ay:',
    options: [
      'nakakasagabal sa malayang daloy ng trapiko',
      'magbabayad ng halagang doble ng dapat bayaran ng nakaparadang sasakyan',
      'obligadong bayaran nang triple ang parking fee',
    ],
    correctAnswer: 0,
    explanation: 'Ang double parking ay nakakasagabal sa malayang daloy ng trapiko.',
  },
  {
    id: 171,
    question: 'Nakita mo ang yellow box sa interseksyon. Hindi ka makakapasok dito maliban kung:',
    options: [
      'tiyak na makakapasok ka nang mahigit sa kalahati nito',
      'tiyak na makalalabas ka sa kabila nito',
      'tiyak na mapapasok mo ito nang lubos',
    ],
    correctAnswer: 1,
    explanation: 'Makakapasok ka lamang sa yellow box kung tiyak na makalalabas ka sa kabila nito.',
  },
  {
    id: 172,
    question:
      'Ang biglaang pagpreno na nagreresulta sa banggaan ng mga sasakyan ay posibleng epekto ng:',
    options: [
      'hindi pagsusuot ng seatbelt',
      'sobrang laki (inflated) na mga gulong',
      'pagtutok o tailgating',
    ],
    correctAnswer: 2,
    explanation: 'Ang tailgating ay nagdudulot ng biglaang pagpreno at posibleng banggaan.',
  },
  {
    id: 173,
    question:
      'Totoo ba na ang di kumikilos na pulang trapikong ilaw ay nangangahulugang dapat kang huminto hanggang ang sangandaan ay maging maaliwalas para magpatuloy?',
    options: ['Totoo', 'Hindi totoo', 'Walang sagot'],
    correctAnswer: 1,
    explanation:
      'Hindi totoo, may mga pagkakataon na maaaring magpatuloy kahit hindi pa maaliwalas ang sangandaan depende sa sitwasyon at signal ng traffic enforcer.',
  },
  {
    id: 174,
    question: 'Alin sa mga sumusunod ang nakalarawan?',
    options: [
      'Delikado ang kurbada sa kaliwa',
      'Delikado ang kurbada sa kanan',
      'Babala ng sangandaan',
    ],
    correctAnswer: 0,
    explanation: 'Ang larawan ay warning sign para sa delikadong kurbada sa kaliwa.',
    image: '/images/174.png',
  },
  {
    id: 175,
    question: 'Ito ay mahalagang kagamitang pangkaligtasan ng isang sasakyan kung iiwanan ito:',
    options: ['parking brake', 'head light switch', 'busina'],
    correctAnswer: 0,
    explanation:
      'Ang parking brake ay mahalagang pangkaligtasang gamit kapag iniiwan ang sasakyan.',
  },
  {
    id: 176,
    question: 'Ano ang gagawin mo kung ang sumusunod na sasakyan sa iyo ay masyadong nakatutok?',
    options: [
      'Bilisan pa ang takbo at makipagkarerahan',
      'Unti-unti mong bagalan ang takbo at senyasan siyang mauna',
      'Biglang magpreno',
    ],
    correctAnswer: 1,
    explanation:
      'Ang tamang gawin ay bagalan ang takbo at senyasan siyang mauna upang maiwasan ang disgrasya.',
  },
  {
    id: 177,
    question:
      'Upang mabawasan ang pinsala ng iyong sasakyan sa kapaligiran, ano ang dapat mong gawin?',
    options: [
      'Prumeno sa maayos na oras',
      'Gumamit ng maikling na mga kalye',
      'Gumamit ng mga busy na ruta',
    ],
    correctAnswer: 0,
    explanation:
      'Ang tamang gawin ay prumeno sa maayos na oras upang maiwasan ang aksidente at polusyon.',
  },
  {
    id: 178,
    question: 'Alin sa mga sumusunod ang nakalarawan?',
    options: ['Huminto ka', 'Bawal pumasok', 'Magbigay ka'],
    correctAnswer: 0,
    explanation: 'Ang larawan ay stop sign na nangangahulugang huminto ka.',
    image: '/images/178.png',
  },
  {
    id: 179,
    question: 'Sa karaniwang kondisyon, ano ang pinakamababang ligtas na distansya sa pagsunod?',
    options: [
      'Hindi bababa sa apat na segundo ang inirerekomendang distansya ng pagsunod sa ilalim ng karaniwang kondisyon',
      'Hindi bababa sa anim na segundo ang inirerekomendang distansya ng pagsunod sa ilalim ng karaniwang kondisyon',
      'Hindi bababa sa dalawang segundo ang inirerekomendang distansya ng pagsunod sa ilalim ng karaniwang kondisyon',
    ],
    correctAnswer: 2,
    explanation:
      'Ang minimum na ligtas na distansya sa pagsunod ay dalawang segundo sa ilalim ng karaniwang kondisyon.',
  },
  {
    id: 180,
    question:
      'Papalapit ka sa interseksyon na may maraming sasakyan. Maraming lane na may mga marka. Sa huling sandali, napagtanto mo na nasa maling lane ka. Dapat kang:',
    options: [
      'ipilit ang iyong daan',
      'manatili sa lane na iyon',
      'huminto hanggang sa wala nang dumadaang mga sasakyan',
    ],
    correctAnswer: 1,
    explanation: 'Ang tamang gawin ay manatili sa lane na iyon upang maiwasan ang disgrasya.',
  },
];

function shuffleArray<T>(array: T[]): T[] {
  // Fisher-Yates shuffle
  const arr = [...array];
  return arr;
}

const QUESTION_COUNTS = ['All', 60, 40, 30];
const ORDER_OPTIONS = [
  { label: 'Sequential', value: 'sequential' },
  { label: 'Random', value: 'random' },
];

export default function Component() {
  // Quiz setup states
  const [quizStarted, setQuizStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState<number | 'All'>(60);
  const [order, setOrder] = useState<'sequential' | 'random'>('sequential');
  // Quiz states
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  // The questions to use for this quiz session
  const [activeQuestions, setActiveQuestions] = useState<typeof questions>([]);
  const [showWrongAnswers, setShowWrongAnswers] = useState(false);

  // Start quiz handler
  const handleStartQuiz = () => {
    let selectedQuestions: typeof questions;
    const count = questionCount === 'All' ? questions.length : questionCount;
    if (order === 'random') {
      selectedQuestions = shuffleArray(questions).slice(0, count);
    } else {
      selectedQuestions = questions.slice(0, count);
    }
    setActiveQuestions(selectedQuestions);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    if (selectedAnswer === activeQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
  };

  const nextQuestion = () => {
    if (currentQuestion < activeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
    setActiveQuestions([]);
  };

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / (activeQuestions.length || 1)) * 100;

  // Quiz setup screen
  if (!quizStarted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white p-4">
        <div className="mx-auto w-full max-w-md space-y-6">
          <Card className="border-0 bg-white shadow-none">
            <CardHeader>
              <CardTitle className="text-center text-2xl">LTO Reviewer Setup</CardTitle>
              <CardDescription className="text-center">
                Choose your quiz preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-primary mb-2 block font-semibold">Number of Questions</label>
                <div className="flex flex-wrap gap-3">
                  {QUESTION_COUNTS.map(count => (
                    <button
                      key={count}
                      className={`focus:ring-primary/50 rounded border px-4 py-2 text-lg font-bold transition-all focus:ring-2 focus:outline-none ${questionCount === count ? 'border-primary bg-primary text-white' : 'text-primary hover:bg-primary/10 border-gray-300 bg-white'}`}
                      onClick={() => setQuestionCount(count === 'All' ? 'All' : Number(count))}
                      type="button"
                    >
                      {count === 'All' ? `All (${questions.length})` : count}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-primary mb-2 block font-semibold">Order</label>
                <div className="flex gap-3">
                  {ORDER_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      className={`focus:ring-primary/50 rounded border px-4 py-2 text-lg font-bold transition-all focus:ring-2 focus:outline-none ${order === opt.value ? 'border-primary bg-primary text-white' : 'text-primary hover:bg-primary/10 border-gray-300 bg-white'}`}
                      onClick={() => setOrder(opt.value as 'sequential' | 'random')}
                      type="button"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <Button className="mt-4 w-full" size="lg" onClick={handleStartQuiz}>
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / activeQuestions.length) * 100);
    const passed = percentage >= 70;
    // Find wrong answers
    const wrongAnswers = activeQuestions
      .map((q, idx) => ({
        question: q,
        userAnswer: answeredQuestions[idx] !== undefined ? answeredQuestions[idx] : null,
        userSelected: answeredQuestions[idx] !== undefined ? answeredQuestions[idx] : null,
        selectedAnswer: answeredQuestions[idx] !== undefined ? answeredQuestions[idx] : null,
        index: idx,
      }))
      .filter(item => {
        // If user selected wrong answer
        return item.selectedAnswer !== null && item.selectedAnswer !== item.question.correctAnswer;
      });

    if (showWrongAnswers) {
      return (
        <div className="min-h-screen bg-white p-4">
          <div className="mx-auto max-w-md">
            <Card className="border-0 bg-white text-center shadow-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Review Wrong Answers</CardTitle>
                <CardDescription>
                  You got {wrongAnswers.length} wrong out of {activeQuestions.length} questions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {wrongAnswers.length === 0 ? (
                  <div className="font-semibold text-green-600">No wrong answers! 🎉</div>
                ) : (
                  <div className="space-y-6">
                    {wrongAnswers.map(item => {
                      const userOption =
                        item.selectedAnswer !== null && item.selectedAnswer !== undefined
                          ? item.question.options[item.selectedAnswer]
                          : undefined;
                      const correctOption = item.question.options[item.question.correctAnswer];
                      return (
                        <div
                          key={item.index}
                          className="rounded-lg border bg-white/80 p-4 text-left"
                        >
                          <div className="text-primary mb-1 font-semibold">
                            Q{item.index + 1}: {item.question.question}
                          </div>
                          <div className="mb-1">
                            <span className="font-semibold text-red-600">Your answer: </span>
                            <span className="text-red-600">
                              {typeof userOption === 'string'
                                ? userOption
                                : userOption &&
                                    typeof userOption === 'object' &&
                                    'alt' in userOption
                                  ? userOption.alt
                                  : 'N/A'}
                            </span>
                          </div>
                          <div className="mb-1">
                            <span className="font-semibold text-green-700">Correct answer: </span>
                            <span className="text-green-700">
                              {typeof correctOption === 'string'
                                ? correctOption
                                : correctOption &&
                                    typeof correctOption === 'object' &&
                                    'alt' in correctOption
                                  ? correctOption.alt
                                  : 'N/A'}
                            </span>
                          </div>
                          <div className="mt-2 text-sm text-blue-900">
                            <span className="font-semibold">Explanation: </span>
                            {item.question.explanation}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <Button className="mt-4 w-full" onClick={() => setShowWrongAnswers(false)}>
                  Back to Score
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-white p-4">
        <div className="mx-auto max-w-md">
          <Card className="border-0 bg-white text-center shadow-none">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4">
                {passed ? (
                  <Trophy className="h-16 w-16 text-yellow-500" />
                ) : (
                  <BookOpen className="h-16 w-16 text-blue-500" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {passed ? 'Congratulations!' : 'Keep Studying!'}
              </CardTitle>
              <CardDescription>
                You scored {score} out of {activeQuestions.length} questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-primary text-4xl font-bold">{percentage}%</div>
              <Badge variant={passed ? 'default' : 'secondary'} className="text-sm">
                {passed ? 'PASSED' : 'NEEDS IMPROVEMENT'}
              </Badge>
              <p className="text-muted-foreground text-sm">
                {passed
                  ? "Great job! You're ready for the LTO exam."
                  : 'Review the materials and try again. You need 70% to pass.'}
              </p>
              <Button onClick={resetQuiz} className="w-full">
                <RotateCcw className="mr-2 h-4 w-4" />
                Take Quiz Again
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowWrongAnswers(true)}
              >
                View All Wrong Answers
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-2 sm:p-4">
      <div className="mx-auto w-full max-w-md space-y-4">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-gray-900">LTO Reviewer</h1>
          <p className="text-sm text-gray-600">Test your driving knowledge</p>
        </div>

        {/* Progress */}
        <div className="w-full py-2">
          <div className="mb-1 flex justify-between px-1 text-xs font-medium">
            <span className="text-gray-700">
              Question {currentQuestion + 1} of {activeQuestions.length}
            </span>
            <span className="text-gray-700">
              Score: {score}/{answeredQuestions.length}
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="border-0 bg-white shadow-none">
          <CardHeader>
            <CardTitle className="text-primary mb-2 text-lg leading-tight">
              {activeQuestions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Display images if question has them */}
            {activeQuestions[currentQuestion].image && (
              <div className="mb-4 flex justify-center">
                <Image
                  src={activeQuestions[currentQuestion].image || '/placeholder.svg'}
                  alt="Traffic Sign"
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-lg border-2 border-gray-200 object-contain"
                />
              </div>
            )}

            {/* Display multiple images if question has them */}
            {activeQuestions[currentQuestion].images && (
              <div className="mb-4 flex flex-wrap justify-center gap-4">
                {activeQuestions[currentQuestion].images.map((imgSrc, imgIndex) => (
                  <Image
                    key={imgIndex}
                    src={imgSrc || '/placeholder.svg'}
                    alt={`Traffic Sign ${imgIndex + 1}`}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-lg border-2 border-gray-200 object-contain"
                  />
                ))}
              </div>
            )}

            <div className="flex flex-col gap-3">
              {activeQuestions[currentQuestion].options.map((option, index) => {
                let buttonClass =
                  'w-full flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/50';
                let icon = null;

                if (showResult) {
                  if (index === activeQuestions[currentQuestion].correctAnswer) {
                    buttonClass += ' bg-green-100 border-green-400 text-green-900';
                    icon = <CheckCircle className="h-5 w-5 text-green-600" />;
                  } else if (
                    index === selectedAnswer &&
                    index !== activeQuestions[currentQuestion].correctAnswer
                  ) {
                    buttonClass += ' bg-red-50 border-red-300 text-red-900';
                    icon = <XCircle className="h-5 w-5 text-red-600" />;
                  } else {
                    buttonClass += ' bg-gray-50 border-gray-200 text-gray-700';
                  }
                } else if (selectedAnswer === index) {
                  buttonClass += ' bg-primary/10 border-primary text-primary';
                } else {
                  buttonClass += ' bg-white border-gray-200 text-gray-900';
                }

                return (
                  <button
                    key={index}
                    className={buttonClass}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    style={{ minHeight: 56 }}
                  >
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-base font-bold text-white">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 text-base">
                      {typeof option === 'string' ? (
                        <span>{option}</span>
                      ) : option.type === 'image' ? (
                        <Image
                          src={option.src || '/placeholder.svg'}
                          alt={option.alt}
                          width={64}
                          height={64}
                          className="mx-auto h-12 w-12 object-contain"
                        />
                      ) : typeof option === 'string' ? (
                        <span>{option}</span>
                      ) : null}
                    </span>
                    {icon && <span className="flex-shrink-0">{icon}</span>}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Explanation Card */}
        {showResult && (
          <Card className="border-0 bg-white shadow-none">
            <CardContent className="pt-4">
              <div className="space-y-2">
                <h4 className="text-primary font-semibold">Explanation:</h4>
                <p className="text-sm text-gray-800">
                  {activeQuestions[currentQuestion].explanation}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          {!showResult ? (
            <Button
              onClick={checkAnswer}
              disabled={selectedAnswer === null}
              className="w-full py-3 text-lg"
              size="lg"
            >
              Check Answer
            </Button>
          ) : (
            <Button onClick={nextQuestion} className="w-full py-3 text-lg" size="lg">
              {currentQuestion < activeQuestions.length - 1 ? 'Next Question' : 'View Results'}
            </Button>
          )}

          <Button
            variant="outline"
            onClick={resetQuiz}
            className="w-full bg-transparent py-3 text-lg text-black"
          >
            <RotateCcw className="mr-2 h-4 w-4 text-black" />
            Restart Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}

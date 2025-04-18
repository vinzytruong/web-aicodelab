import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax, Pagination, Navigation } from 'swiper/modules';
import { styled } from '@mui/material/styles';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Typography, useTheme } from '@mui/material';
import { useConfig } from '../../hooks/useConfig';

// Styled Components
const StyledSwiper = styled(Swiper)(() => ({
    width: '100%',
    height: '100%',
    background: 'transparent',
}));

const StyledSwiperSlide = styled(SwiperSlide)(() => ({
    fontSize: '18px',
    color: '#fff',
    boxSizing: 'border-box',
    padding: '40px 60px',
}));

const ParallaxBg = styled('div')(() => ({
    position: 'absolute',
    left: 0,
    top: 0,
    width: '130%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

const Title = styled('div')(() => ({
    fontSize: '41px',
    fontWeight: 300,
}));

const Subtitle = styled('div')(() => ({
    fontSize: '21px',
}));

const Text = styled('div')(() => ({
    fontSize: '14px',
    maxWidth: '400px',
    lineHeight: 1.3,
}));

// Props Interface
interface SlideItem {
    title: string;
    content: string;
    address: string
}

interface ScheduleSlideProps {
    slides: SlideItem[];
    backgroundImage?: string;
}

function ScheduleSlide({ slides, backgroundImage }: ScheduleSlideProps) {
    const theme = useTheme()
    const { borderRadius } = useConfig()

    return (
        <StyledSwiper
            style={{ borderRadius: `4px` }}
            speed={600}
            parallax={true}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Parallax, Pagination, Navigation]}
        >
            {backgroundImage && (
                <ParallaxBg
                    slot="container-start"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                    }}
                    data-swiper-parallax="-23%"
                />
            )}

            {slides.map((slide, index) => (
                <StyledSwiperSlide key={index}>
                    <Title data-swiper-parallax="-300">
                        <Typography variant='h2' pb={2} color={theme.palette.text.secondary}>
                            {slide.title}
                        </Typography>

                    </Title>
                    {/* <Subtitle data-swiper-parallax="-200">{slide.subtitle}</Subtitle> */}
                    <Text data-swiper-parallax="-100">
                        <Typography lineHeight={2} variant='body2' color={theme.palette.text.secondary}>{slide.content}</Typography>
                        <Typography lineHeight={2} variant='body2' color={theme.palette.text.secondary}>{slide.address}</Typography>
                    </Text>
                </StyledSwiperSlide>
            ))}
        </StyledSwiper>
    );
}

export default ScheduleSlide;

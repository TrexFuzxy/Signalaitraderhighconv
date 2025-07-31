import numpy as np
import pandas as pd
from typing import Dict, List, Tuple
import cv2
from PIL import Image
import io

class TechnicalAnalyzer:
    """
    Advanced technical analysis engine for GPTChart Institutional
    """
    
    def __init__(self):
        self.indicators = {}
        
    def calculate_rsi(self, prices: List[float], period: int = 14) -> float:
        """Calculate Relative Strength Index"""
        if len(prices) < period + 1:
            return 50.0
            
        deltas = np.diff(prices)
        gains = np.where(deltas > 0, deltas, 0)
        losses = np.where(deltas < 0, -deltas, 0)
        
        avg_gain = np.mean(gains[:period])
        avg_loss = np.mean(losses[:period])
        
        if avg_loss == 0:
            return 100.0
            
        rs = avg_gain / avg_loss
        rsi = 100 - (100 / (1 + rs))
        
        return rsi
    
    def calculate_macd(self, prices: List[float], fast: int = 12, slow: int = 26, signal: int = 9) -> Dict:
        """Calculate MACD indicator"""
        prices_array = np.array(prices)
        
        ema_fast = self._calculate_ema(prices_array, fast)
        ema_slow = self._calculate_ema(prices_array, slow)
        
        macd_line = ema_fast - ema_slow
        signal_line = self._calculate_ema(macd_line, signal)
        histogram = macd_line - signal_line
        
        return {
            'macd': macd_line[-1] if len(macd_line) > 0 else 0,
            'signal': signal_line[-1] if len(signal_line) > 0 else 0,
            'histogram': histogram[-1] if len(histogram) > 0 else 0
        }
    
    def _calculate_ema(self, prices: np.ndarray, period: int) -> np.ndarray:
        """Calculate Exponential Moving Average"""
        alpha = 2 / (period + 1)
        ema = np.zeros_like(prices)
        ema[0] = prices[0]
        
        for i in range(1, len(prices)):
            ema[i] = alpha * prices[i] + (1 - alpha) * ema[i-1]
            
        return ema
    
    def calculate_bollinger_bands(self, prices: List[float], period: int = 20, std_dev: float = 2) -> Dict:
        """Calculate Bollinger Bands"""
        prices_array = np.array(prices)
        
        if len(prices_array) < period:
            return {'upper': 0, 'middle': 0, 'lower': 0}
            
        sma = np.mean(prices_array[-period:])
        std = np.std(prices_array[-period:])
        
        return {
            'upper': sma + (std * std_dev),
            'middle': sma,
            'lower': sma - (std * std_dev)
        }
    
    def calculate_atr(self, ohlc_data: List[Dict], period: int = 14) -> float:
        """Calculate Average True Range"""
        if len(ohlc_data) < period + 1:
            return 0.0
            
        true_ranges = []
        
        for i in range(1, len(ohlc_data)):
            high = ohlc_data[i]['high']
            low = ohlc_data[i]['low']
            prev_close = ohlc_data[i-1]['close']
            
            tr = max(
                high - low,
                abs(high - prev_close),
                abs(low - prev_close)
            )
            true_ranges.append(tr)
        
        return np.mean(true_ranges[-period:])
    
    def detect_chart_patterns(self, ohlc_data: List[Dict]) -> List[Dict]:
        """Detect various chart patterns"""
        patterns = []
        
        if len(ohlc_data) < 3:
            return patterns
            
        # Double Top/Bottom Detection
        highs = [candle['high'] for candle in ohlc_data[-20:]]
        lows = [candle['low'] for candle in ohlc_data[-20:]]
        
        # Head and Shoulders Detection
        if self._detect_head_and_shoulders(ohlc_data[-50:]):
            patterns.append({
                'name': 'Head and Shoulders',
                'type': 'bearish',
                'confidence': 75
            })
        
        # Triangle Patterns
        triangle = self._detect_triangle_pattern(ohlc_data[-30:])
        if triangle:
            patterns.append(triangle)
            
        return patterns
    
    def _detect_head_and_shoulders(self, data: List[Dict]) -> bool:
        """Detect Head and Shoulders pattern"""
        if len(data) < 20:
            return False
            
        highs = [candle['high'] for candle in data]
        
        # Find local maxima
        peaks = []
        for i in range(1, len(highs) - 1):
            if highs[i] > highs[i-1] and highs[i] > highs[i+1]:
                peaks.append((i, highs[i]))
        
        if len(peaks) < 3:
            return False
            
        # Check if middle peak is highest (head)
        peaks.sort(key=lambda x: x[1], reverse=True)
        head = peaks[0]
        shoulders = peaks[1:3]
        
        # Validate pattern structure
        left_shoulder, right_shoulder = sorted(shoulders, key=lambda x: x[0])
        
        return (left_shoulder[0] < head[0] < right_shoulder[0] and
                abs(left_shoulder[1] - right_shoulder[1]) / left_shoulder[1] < 0.05)
    
    def _detect_triangle_pattern(self, data: List[Dict]) -> Dict:
        """Detect triangle patterns"""
        if len(data) < 10:
            return None
            
        highs = [candle['high'] for candle in data]
        lows = [candle['low'] for candle in data]
        
        # Calculate trend lines
        high_slope = self._calculate_trendline_slope(highs)
        low_slope = self._calculate_trendline_slope(lows)
        
        # Ascending Triangle
        if abs(high_slope) < 0.001 and low_slope > 0.001:
            return {
                'name': 'Ascending Triangle',
                'type': 'bullish',
                'confidence': 70
            }
        
        # Descending Triangle
        if high_slope < -0.001 and abs(low_slope) < 0.001:
            return {
                'name': 'Descending Triangle',
                'type': 'bearish',
                'confidence': 70
            }
        
        # Symmetrical Triangle
        if high_slope < -0.001 and low_slope > 0.001:
            return {
                'name': 'Symmetrical Triangle',
                'type': 'neutral',
                'confidence': 65
            }
        
        return None
    
    def _calculate_trendline_slope(self, prices: List[float]) -> float:
        """Calculate slope of trendline"""
        x = np.arange(len(prices))
        y = np.array(prices)
        
        # Linear regression
        slope = np.polyfit(x, y, 1)[0]
        return slope

class SmartMoneyAnalyzer:
    """
    Smart Money Concepts (SMC) analysis engine
    """
    
    def __init__(self):
        self.order_blocks = []
        self.fair_value_gaps = []
        
    def detect_order_blocks(self, ohlc_data: List[Dict]) -> List[Dict]:
        """Detect institutional order blocks"""
        order_blocks = []
        
        for i in range(2, len(ohlc_data) - 2):
            current = ohlc_data[i]
            prev = ohlc_data[i-1]
            next_candle = ohlc_data[i+1]
            
            # Bullish Order Block
            if (current['close'] > current['open'] and  # Green candle
                next_candle['close'] > current['high'] and  # Next candle breaks high
                self._is_strong_move(ohlc_data[i:i+5])):  # Strong follow-through
                
                order_blocks.append({
                    'type': 'bullish',
                    'high': current['high'],
                    'low': current['low'],
                    'index': i,
                    'strength': self._calculate_ob_strength(ohlc_data, i)
                })
        
        return order_blocks
    
    def detect_fair_value_gaps(self, ohlc_data: List[Dict]) -> List[Dict]:
        """Detect Fair Value Gaps (FVG)"""
        fvgs = []
        
        for i in range(1, len(ohlc_data) - 1):
            candle1 = ohlc_data[i-1]
            candle2 = ohlc_data[i]
            candle3 = ohlc_data[i+1]
            
            # Bullish FVG
            if (candle1['high'] < candle3['low'] and
                candle2['close'] > candle2['open']):  # Middle candle is bullish
                
                fvgs.append({
                    'type': 'bullish',
                    'top': candle3['low'],
                    'bottom': candle1['high'],
                    'index': i
                })
            
            # Bearish FVG
            elif (candle1['low'] > candle3['high'] and
                  candle2['close'] < candle2['open']):  # Middle candle is bearish
                
                fvgs.append({
                    'type': 'bearish',
                    'top': candle1['low'],
                    'bottom': candle3['high'],
                    'index': i
                })
        
        return fvgs
    
    def detect_break_of_structure(self, ohlc_data: List[Dict]) -> Dict:
        """Detect Break of Structure (BOS)"""
        if len(ohlc_data) < 20:
            return None
            
        # Find recent swing highs and lows
        swing_highs = self._find_swing_points(ohlc_data, 'high')
        swing_lows = self._find_swing_points(ohlc_data, 'low')
        
        current_price = ohlc_data[-1]['close']
        
        # Check for bullish BOS
        if swing_highs:
            last_high = max(swing_highs, key=lambda x: x['price'])
            if current_price > last_high['price']:
                return {
                    'type': 'bullish',
                    'level': last_high['price'],
                    'confidence': 80
                }
        
        # Check for bearish BOS
        if swing_lows:
            last_low = min(swing_lows, key=lambda x: x['price'])
            if current_price < last_low['price']:
                return {
                    'type': 'bearish',
                    'level': last_low['price'],
                    'confidence': 80
                }
        
        return None
    
    def _is_strong_move(self, candles: List[Dict]) -> bool:
        """Check if price movement is strong enough for order block"""
        if len(candles) < 3:
            return False
            
        total_move = abs(candles[-1]['close'] - candles[0]['open'])
        avg_range = np.mean([c['high'] - c['low'] for c in candles])
        
        return total_move > avg_range * 2
    
    def _calculate_ob_strength(self, ohlc_data: List[Dict], index: int) -> float:
        """Calculate order block strength"""
        if index >= len(ohlc_data) - 5:
            return 0.5
            
        # Volume analysis (if available)
        volume_strength = 0.7  # Default
        
        # Follow-through analysis
        follow_through = sum(1 for i in range(index+1, min(index+6, len(ohlc_data)))
                           if ohlc_data[i]['close'] > ohlc_data[i]['open'])
        
        strength = (volume_strength + follow_through/5) / 2
        return min(strength, 1.0)
    
    def _find_swing_points(self, ohlc_data: List[Dict], point_type: str) -> List[Dict]:
        """Find swing highs or lows"""
        swing_points = []
        lookback = 5
        
        prices = [candle[point_type] for candle in ohlc_data]
        
        for i in range(lookback, len(prices) - lookback):
            if point_type == 'high':
                if all(prices[i] >= prices[j] for j in range(i-lookback, i+lookback+1) if j != i):
                    swing_points.append({'index': i, 'price': prices[i]})
            else:  # low
                if all(prices[i] <= prices[j] for j in range(i-lookback, i+lookback+1) if j != i):
                    swing_points.append({'index': i, 'price': prices[i]})
        
        return swing_points

class ChartImageAnalyzer:
    """
    Computer vision analysis for chart images
    """
    
    def __init__(self):
        self.patterns = {}
    
    def analyze_chart_image(self, image_data: bytes) -> Dict:
        """Analyze uploaded chart image"""
        # Convert bytes to image
        image = Image.open(io.BytesIO(image_data))
        cv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        
        # Extract candlestick data
        candlesticks = self._extract_candlesticks(cv_image)
        
        # Detect patterns
        patterns = self._detect_visual_patterns(cv_image)
        
        # Identify support/resistance levels
        levels = self._detect_support_resistance(cv_image)
        
        return {
            'candlesticks': candlesticks,
            'patterns': patterns,
            'levels': levels,
            'confidence': self._calculate_analysis_confidence(patterns, levels)
        }
    
    def _extract_candlesticks(self, image: np.ndarray) -> List[Dict]:
        """Extract candlestick data from chart image"""
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Edge detection
        edges = cv2.Canny(gray, 50, 150)
        
        # Find contours (simplified approach)
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        candlesticks = []
        
        # Process contours to identify candlestick bodies and wicks
        for contour in contours:
            x, y, w, h = cv2.boundingRect(contour)
            
            # Filter by size to identify potential candlesticks
            if 5 < w < 50 and 10 < h < 200:
                candlesticks.append({
                    'x': x,
                    'y': y,
                    'width': w,
                    'height': h,
                    'type': 'bullish' if self._is_green_candle(image, x, y, w, h) else 'bearish'
                })
        
        return candlesticks
    
    def _is_green_candle(self, image: np.ndarray, x: int, y: int, w: int, h: int) -> bool:
        """Determine if candlestick is bullish (green) or bearish (red)"""
        roi = image[y:y+h, x:x+w]
        
        # Calculate average color in BGR
        avg_color = np.mean(roi, axis=(0, 1))
        
        # Simple heuristic: green if G > R, red if R > G
        return avg_color[1] > avg_color[2]  # G > R in BGR
    
    def _detect_visual_patterns(self, image: np.ndarray) -> List[Dict]:
        """Detect chart patterns using computer vision"""
        patterns = []
        
        # Convert to grayscale for pattern detection
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Template matching for common patterns (simplified)
        # In production, you'd use more sophisticated ML models
        
        # Detect trend lines
        lines = cv2.HoughLinesP(cv2.Canny(gray, 50, 150), 1, np.pi/180, 
                               threshold=100, minLineLength=50, maxLineGap=10)
        
        if lines is not None:
            for line in lines:
                x1, y1, x2, y2 = line[0]
                slope = (y2 - y1) / (x2 - x1) if x2 != x1 else float('inf')
                
                if abs(slope) < 0.1:  # Horizontal support/resistance
                    patterns.append({
                        'type': 'support_resistance',
                        'level': y1,
                        'confidence': 70
                    })
                elif slope > 0.1:  # Upward trend line
                    patterns.append({
                        'type': 'uptrend_line',
                        'slope': slope,
                        'confidence': 65
                    })
                elif slope < -0.1:  # Downward trend line
                    patterns.append({
                        'type': 'downtrend_line',
                        'slope': slope,
                        'confidence': 65
                    })
        
        return patterns
    
    def _detect_support_resistance(self, image: np.ndarray) -> List[Dict]:
        """Detect support and resistance levels"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Horizontal line detection
        horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (40, 1))
        horizontal_lines = cv2.morphologyEx(gray, cv2.MORPH_OPEN, horizontal_kernel)
        
        # Find contours of horizontal lines
        contours, _ = cv2.findContours(horizontal_lines, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        levels = []
        for contour in contours:
            x, y, w, h = cv2.boundingRect(contour)
            
            if w > 100 and h < 5:  # Long horizontal line
                levels.append({
                    'type': 'horizontal',
                    'level': y,
                    'strength': w / image.shape[1],  # Relative to image width
                    'touches': self._count_price_touches(image, y)
                })
        
        return levels
    
    def _count_price_touches(self, image: np.ndarray, level: int) -> int:
        """Count how many times price touched a level"""
        # Simplified approach - count pixels near the level
        tolerance = 5
        row = image[max(0, level-tolerance):min(image.shape[0], level+tolerance), :]
        
        # Count non-background pixels (simplified)
        touches = np.sum(np.mean(row, axis=2) < 200) // 50  # Rough estimate
        
        return min(touches, 10)  # Cap at 10
    
    def _calculate_analysis_confidence(self, patterns: List[Dict], levels: List[Dict]) -> float:
        """Calculate overall confidence in the analysis"""
        pattern_confidence = np.mean([p['confidence'] for p in patterns]) if patterns else 50
        level_confidence = len(levels) * 10  # More levels = higher confidence
        
        overall_confidence = (pattern_confidence + level_confidence) / 2
        return min(overall_confidence, 95)  # Cap at 95%

# Example usage
if __name__ == "__main__":
    # Initialize analyzers
    tech_analyzer = TechnicalAnalyzer()
    smc_analyzer = SmartMoneyAnalyzer()
    image_analyzer = ChartImageAnalyzer()
    
    # Sample OHLC data
    sample_data = [
        {'open': 1.1000, 'high': 1.1020, 'low': 1.0995, 'close': 1.1015},
        {'open': 1.1015, 'high': 1.1030, 'low': 1.1010, 'close': 1.1025},
        {'open': 1.1025, 'high': 1.1035, 'low': 1.1020, 'close': 1.1030},
        # Add more data points...
    ]
    
    # Calculate technical indicators
    prices = [candle['close'] for candle in sample_data]
    rsi = tech_analyzer.calculate_rsi(prices)
    macd = tech_analyzer.calculate_macd(prices)
    bb = tech_analyzer.calculate_bollinger_bands(prices)
    atr = tech_analyzer.calculate_atr(sample_data)
    
    # Detect patterns
    chart_patterns = tech_analyzer.detect_chart_patterns(sample_data)
    order_blocks = smc_analyzer.detect_order_blocks(sample_data)
    fvgs = smc_analyzer.detect_fair_value_gaps(sample_data)
    bos = smc_analyzer.detect_break_of_structure(sample_data)
    
    print(f"RSI: {rsi:.2f}")
    print(f"MACD: {macd}")
    print(f"Bollinger Bands: {bb}")
    print(f"ATR: {atr:.4f}")
    print(f"Chart Patterns: {chart_patterns}")
    print(f"Order Blocks: {len(order_blocks)}")
    print(f"Fair Value Gaps: {len(fvgs)}")
    print(f"Break of Structure: {bos}")
